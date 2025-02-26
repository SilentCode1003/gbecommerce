import React, { useState } from "react";

import { Button, Form, Input, Modal, Checkbox } from 'antd';

const LoginWidget = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleLogin = (values) => {
        console.log("Login attempt:", values);

        // Simulating an error
        const loginSuccessful = false;

        if (!loginSuccessful) {
            setShowErrorModal(true);
        } else {
            alert("Logged in!");
        }
    };
    const inputboxstyle = "bg-gray-200 focus:bg-white border rounded-[9px] px-3 py-[7px] w-full border-gray-300 focus:border-gray-600 mx-auto hover:bg-gray-100 hover:border--400 transition-colors duration-200 outline-none";
    const LFLabel = "text-gray-700 font-bold";
    const Fieldstyle = "flex flex-col gap-1 mb-4";


    return (
        <div className="flex justify-center pt-4 bg--100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg sm:w-1/2 lg:w-[30rem] md:w-[30rem] sm:w-[25.3rem] xs:w-[23.3rem] px-10 py-8">
                <h1 className="text-2xl font-bold mb-5 text-left">Login</h1>

                {/* Login Form */}
                <Form layout="vertical" onFinish={handleLogin}>
                    {/* Username */}
                    <Form.Item
                        label={<span className="font-bold text-gray-700">Username</span>}
                        name="username"
                        dependencies={["username"]}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value) {
                                        this.required = true;
                                        return Promise.resolve(); // No validation when empty
                                    }
                                    if (value.length < 3) {
                                        return Promise.reject(new Error("Username must be at least 3 characters"));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Enter your username" />
                    </Form.Item>

                    {/* Password */}
                    <Form.Item
                        label={<span className="font-bold text-gray-700">Password</span>}
                        name="password"
                        dependencies={["password"]}
                        rules={[

                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value) {
                                        this.required = true;
                                        return Promise.resolve(); // No validation when empty
                                    }
                                    if (value.length < 6) {
                                        return Promise.reject(new Error("Password must be at least 6 characters"));

                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            className="focus:bg-white border rounded-md px-3 py-2 w-full border-gray-300 "
                            placeholder="Enter password"
                        />
                    </Form.Item>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex justify-between items-center">
                        <Checkbox className="flex items-center text-sm text-gray-700">Remember Me
                        </Checkbox>
                        {/* <label className="flex items-center text-sm text-gray-700">
                            <input type="checkbox" className="mr-2 w-4 h-4 border-2 border-gray-400 rounded-md checked:bg-blue-600 checked:border-blue-800 hover:border-blue-400 transition-all duration-300" />
                        </label> */}
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <div className="flex justify-center mt-5">
                        <Button
                            htmlType="submit"
                            className={`text-white bg-blue-600 hover:bg-blue-700 text-lg font-medium py-2 px-6 rounded-md transition duration-300 w-full`}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            Log in
                        </Button>
                    </div>
                </Form>

                {/* Error Modal */}
                <Modal
                    title="Login Error"
                    visible={showErrorModal}
                    onCancel={() => setShowErrorModal(false)}
                    footer={[
                        <Button key="close" onClick={() => setShowErrorModal(false)}>
                            Close
                        </Button>,
                    ]}
                >
                    <p className="text-gray-600">Invalid email or password.</p>
                </Modal>
            </div>
        </div>
    );
};

export default LoginWidget;
