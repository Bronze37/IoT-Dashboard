import React from 'react';
import Clock from '../components/Clock';
import avt from '../img/avt.jpg';

const Profile = () => {
    return (
        <div>
            <strong className="h-[90px] border-b mr-[100px] flex justify-start items-center">
                <div>PROFILE</div>
                <Clock />
            </strong>
            <hr className="mr-[100px]" />

            <section className="pt-16 mr-[100px]">
                <div className="w-full lg:w-6/12 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative">
                                        <img
                                            alt="..."
                                            src={avt}
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-4 text-center mt-20"></div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                                    Nguyễn Đình Đồng <br />
                                    <span className="text-[15px]">
                                        B21DCCN231
                                    </span>
                                </h3>

                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    Công nghệ phần mềm
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                    Học viện Công nghệ Bưu chính Viễn thông
                                </div>
                            </div>
                            <div className="flex flex-row justify-evenly mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="mb-2 text-blueGray-600 flex justify-center items-center">
                                    
                                    <a href = "https://drive.google.com/file/d/1E5zaK7swJmrVZhHKa1w2Rt3Gw0SuzlN8/view?usp=sharing"
                                    target = "_blank"
                                    rel = "noopener noreferrer" >
                                        Báo cáo
                                    </a>
                                </div>
                                <div className="mb-2 text-blueGray-600 flex justify-center items-center">
                                    
                                    <a href = "https://github.com/Bronze37/IoT-Dashboard"
                                    target = "_blank"
                                    rel = "noopener noreferrer" >
                                        Github
                                    </a>
                                </div>
                                <div className="mb-2 text-blueGray-600 flex justify-center items-center">
                                    
                                    <a a href = "https://drive.google.com/file/d/1iWTAxv2HZH35xV5KcqXiAERZ7OorWjZ-/view?usp=sharing"
                                    target = "_blank"
                                    rel = "noopener noreferrer" >
                                        API Doc
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
