#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// Cấu hình WiFi
const char* ssid = "gì cũng được";        
const char* password = "hehehe123";  

// Cấu hình MQTT
const char* mqtt_server = "192.168.19.105";
const int mqtt_port = 1883;
const char* mqtt_topic = "sensor";

// Thông tin xác thực MQTT
const char* mqtt_user = "DongND";   
const char* mqtt_pass = "dong1808"; 

// Chủ đề để gửi trạng thái relay
const char* relay_status_topic = "relay_status";

// Các chủ đề MQTT cho điều khiển relay
const char* relay_1_topic = "relay_1";
const char* relay_2_topic = "relay_2";
const char* relay_3_topic = "relay_3";

// Cấu hình DHT11
#define DHTPIN 4        
#define DHTTYPE DHT11   
DHT dht(DHTPIN, DHTTYPE);

// Cấu hình chân relay
#define RELAY_1_PIN 21  
#define RELAY_2_PIN 19  
#define RELAY_3_PIN 18 

// Cấu hình chân cảm biến ánh sáng
#define LIGHT_SENSOR_PIN 34  
#define maxLux 500

// Biến trạng thái relay
int state_1 = 0;
int state_2 = 0;
int state_3 = 0;

// MQTT client
WiFiClient espClient;
PubSubClient client(espClient);

// Hàm kết nối WiFi
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

// Hàm xử lý các tin nhắn MQTT
void callback(char* topic, byte* message, unsigned int length) {
  String msg;
  
  for (int i = 0; i < length; i++) {
    msg += (char)message[i];
  }

  Serial.print("Message arrived on topic: ");
  Serial.println(topic);
  Serial.print("Message: ");
  Serial.println(msg);

  // Xử lý các relay dựa trên thông điệp nhận được
  if (String(topic) == relay_1_topic) {
    if (msg == "1") {
      digitalWrite(RELAY_1_PIN, HIGH); 
      state_1 = 1;  
      Serial.println("Relay 1 ON");
    } else if (msg == "0") {
      digitalWrite(RELAY_1_PIN, LOW);   
      state_1 = 0; 
      Serial.println("Relay 1 OFF");
    }
  }

  if (String(topic) == relay_2_topic) {
    if (msg == "1") {
      digitalWrite(RELAY_2_PIN, HIGH);  // Bật relay 2
      state_2 = 1;  // Cập nhật trạng thái relay 2
      Serial.println("Relay 2 ON");
    } else if (msg == "0") {
      digitalWrite(RELAY_2_PIN, LOW);   // Tắt relay 2
      state_2 = 0;  // Cập nhật trạng thái relay 2
      Serial.println("Relay 2 OFF");
    }
  }

  if (String(topic) == relay_3_topic) {
    if (msg == "1") {
      digitalWrite(RELAY_3_PIN, HIGH);  // Bật relay 3
      state_3 = 1;  // Cập nhật trạng thái relay 3
      Serial.println("Relay 3 ON");
    } else if (msg == "0") {
      digitalWrite(RELAY_3_PIN, LOW);   // Tắt relay 3
      state_3 = 0;  // Cập nhật trạng thái relay 3
      Serial.println("Relay 3 OFF");
    }
  }
}

// Hàm kết nối MQTT với thông tin xác thực
void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP32Client", mqtt_user, mqtt_pass)) {  
      Serial.println("connected");

      client.subscribe(relay_1_topic);
      client.subscribe(relay_2_topic);
      client.subscribe(relay_3_topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  setup_wifi();
  
  // Thiết lập chân điều khiển relay
  pinMode(RELAY_1_PIN, OUTPUT);
  pinMode(RELAY_2_PIN, OUTPUT);
  pinMode(RELAY_3_PIN, OUTPUT);
  
  // Thiết lập chân cảm biến ánh sáng
  pinMode(LIGHT_SENSOR_PIN, INPUT);
  
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);  
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Đọc dữ liệu từ DHT11
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Kiểm tra nếu có lỗi khi đọc cảm biến
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  int sensorValue = analogRead(LIGHT_SENSOR_PIN); 
  float voltage = sensorValue * (3.3 / 4095.0); 
  float light = 500 - (voltage / 3.3) * maxLux;

  // Tạo JSON để gửi
  String payload = "{\"temperature\": ";
  payload += String(t);
  payload += ", \"humidity\": ";
  payload += String(h);
  payload += ", \"light\": ";
  payload += String(light);
  payload += ", \"state_1\" : ";
  payload += String(state_1);
  payload += ", \"state_2\" : ";
  payload += String(state_2);
  payload += ", \"state_3\" : ";
  payload += String(state_3);
  payload += "}";

  // Gửi dữ liệu qua MQTT
  Serial.print("Publishing message: ");
  Serial.println(payload);
  client.publish(mqtt_topic, (char*) payload.c_str());

  // Chờ 1 giây trước khi gửi lần tiếp theo
  delay(1000);
}
