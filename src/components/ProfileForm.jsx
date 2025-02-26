import React, { useState, useRef } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { PopupBG, CSAccount, PopupContainer } from '../css/GeneralInterface';

const ProfileForm = () => {
    const [isFocused, setIsFocused] = useState({});
    const [isHovering, setIsHovering] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        phone: '',
        gender: '',
        otherGender: '',
        dob: '',
    });

    const otherGenderRef = useRef(null);

    const handleFocus = (field) => {
        setIsFocused({ ...isFocused, [field]: true });
    };

    const handleBlur = (field) => {
        setIsFocused({ ...isFocused, [field]: false });
    };

    const handleChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        });
    };

    const handleGenderChange = (event) => {
        if (event.target.value === 'other') {
            otherGenderRef.current?.focus();
        }
        handleChange('gender')(event);
    };

    const [showErrorModal, setShowErrorModal] = useState(false);

    const handlesave = (event) => {
        event.preventDefault();

        // Simulating an error 
        const ProfileUpdateSuccessful = false;

        if (!ProfileUpdateSuccessful) {
            setShowErrorModal(true);
        } else {
            alert("Logged in!");
        }
    };

    const MPFLabel = "mt-1 text-gray-700 w-1/5 text-right font-bold";
    const FieldContainer = "bg--100 flex flex-row gap-4 sm:pl-1 sm:gap-9 pl-10 xs:px-0 pr-10 sm:pr-0 items-center";
    const FieldVerify = "text-green-500 text-xl ml-[-4rem] absolute right-2 top-1/2 transform -translate-y-1/2";  // Green check
    const FieldError = "text-red-500 text-xl ml-[-1.6rem] absolute right-2 top-1/2 transform -translate-y-1/2";   // Red X

    return (
        <div>
            <div className="bg--100 pt-4 flex flex-col lg:flex-row justify-center gap-6 lg:gap-10 px-5">
                <div className={`${CSAccount} flex flex-col w-full lg:w-1/2 p-8 gap-6`}>
                    <h1 className="bg--100 text-2xl font-bold mb-4">My Profile</h1>

                    {/* Username */}
                    <div className="bg--100 items-center">
                        <div className={FieldContainer}>
                            <label className={MPFLabel}>Username</label>
                            <div className="w-2/3 relative">
                                <input
                                    className={`border rounded px-2 py-1 w-full ${isFocused.username ? 'border-gray-600' : 'border-gray-300'}`}
                                    placeholder="Enter your Name here"
                                    value={formData.username}
                                    onChange={handleChange('username')}
                                    onFocus={() => handleFocus('username')}
                                    onBlur={() => handleBlur('username')}
                                />
                                {formData.username ? <FaCheck className={FieldVerify} /> : <FaTimes className={FieldError} />}
                            </div>
                            {/* <p className="text-gray-400 text-sm mt-1">Username can only be changed once</p> */}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 bg--200 pb-5' >
                        {/* Password */}
                        <div className={FieldContainer}>
                            <label className={MPFLabel}>Password</label>
                            <div className="w-2/3 relative">
                                <input
                                    type="password"
                                    className={`border rounded px-2 py-1 w-full ${isFocused.password ? 'border-gray-600' : 'border-gray-300'}`}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange('password')}
                                    onFocus={() => handleFocus('password')}
                                    onBlur={() => handleBlur('password')}
                                />
                                {formData.password ? <FaCheck className={FieldVerify} /> : <FaTimes className={FieldError} />}
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className={FieldContainer}>
                            <label className={MPFLabel}>Confirm Password</label>
                            <div className="w-2/3 relative">
                                <input
                                    type="password"
                                    className={`border rounded px-2 py-1 w-full ${isFocused.confirmPassword ? 'border-gray-600' : 'border-gray-300'}`}
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange('confirmPassword')}
                                    onFocus={() => handleFocus('confirmPassword')}
                                    onBlur={() => handleBlur('confirmPassword')}
                                />
                                {formData.confirmPassword ? <FaCheck className={FieldVerify} /> : <FaTimes className={FieldError} />}
                            </div>
                        </div>

                    </div>


                    {/* Address */}
                    <div className={FieldContainer}>
                        <label className={MPFLabel}>Street Address</label>
                        <div className="w-2/3 relative">
                            <input
                                className={`border rounded px-2 py-1 w-full ${isFocused.street ? 'border-gray-600' : 'border-gray-300'}`}
                                placeholder="Enter your street address"
                                value={formData.street}
                                onChange={handleChange('street')}
                                onFocus={() => handleFocus('street')}
                                onBlur={() => handleBlur('street')}
                            />
                            {formData.street ? <FaCheck className={FieldVerify} /> : <FaTimes className={FieldError} />}
                        </div>
                    </div>

                    {/* City */}
                    <div className={FieldContainer}>
                        <label className={MPFLabel}>City</label>
                        <div className="w-2/3 relative">
                            <input
                                className={`border rounded px-2 py-1 w-full ${isFocused.city ? 'border-gray-600' : 'border-gray-300'}`}
                                placeholder="Enter your city"
                                value={formData.city}
                                onChange={handleChange('city')}
                                onFocus={() => handleFocus('city')}
                                onBlur={() => handleBlur('city')}
                            />
                            {formData.city ? <FaCheck className={FieldVerify} /> : <FaTimes className={FieldError} />}
                        </div>
                    </div>

                    {/* State */}
                    <div className={FieldContainer}>
                        <label className={MPFLabel}>State</label>
                        <div className="w-2/3 relative">
                            <input
                                className={`border rounded px-2 py-1 w-full ${isFocused.state ? 'border-gray-600' : 'border-gray-300'}`}
                                placeholder="Enter your state"
                                value={formData.state}
                                onChange={handleChange('state')}
                                onFocus={() => handleFocus('state')}
                                onBlur={() => handleBlur('state')}
                            />
                            {formData.state ? <FaCheck className={FieldVerify} /> : <FaTimes className={FieldError} />}
                        </div>
                    </div>

                    {/* Zip Code */}
                    <div className={FieldContainer}>
                        <label className={MPFLabel}>Zip Code</label>
                        <div className="w-2/3 relative">
                            <input
                                className={`border rounded px-2 py-1 w-full ${isFocused.zip ? 'border-gray-600' : 'border-gray-300'}`}
                                placeholder="Enter your zip code"
                                value={formData.zip}
                                onChange={handleChange('zip')}
                                onFocus={() => handleFocus('zip')}
                                onBlur={() => handleBlur('zip')}
                            />
                            {formData.zip ? <FaCheck className={FieldVerify} /> : <FaTimes className={FieldError} />}
                        </div>
                    </div>

                    {/* Email */}
                    <div className={FieldContainer}>
                        <label className={MPFLabel}>Email</label>
                        <div className="w-2/3 relative">
                            <input
                                className={`border rounded px-2 py-1 w-full ${isFocused.email ? 'border-gray-600' : 'border-gray-300'}`}
                                placeholder="Enter your email here"
                                value={formData.email}
                                onChange={handleChange('email')}
                                onFocus={() => handleFocus('email')}
                                onBlur={() => handleBlur('email')}
                            />
                            {formData.email ? <FaCheck className={FieldVerify} /> : <FaTimes className={FieldError} />}
                        </div>
                    </div>

                    {/* Phone */}
                    <div className={FieldContainer}>
                        <label className={MPFLabel}>Phone</label>
                        <div className="w-2/3 relative">
                            <input
                                className={`border rounded px-2 py-1 w-full ${isFocused.phone ? 'border-gray-600' : 'border-gray-300'}`}
                                placeholder="Enter your Phone number here"
                                value={formData.phone}
                                onChange={handleChange('phone')}
                                onFocus={() => handleFocus('phone')}
                                onBlur={() => handleBlur('phone')}
                            />
                            {formData.phone ? <FaCheck className={FieldVerify} /> : <FaTimes className={FieldError} />}
                        </div>
                    </div>

                    {/* Gender */}
                    <div className={FieldContainer}>
                        <label className={MPFLabel}>Gender</label>
                        <div className="w-2/3 flex flex-col gap-[1.9px]">
                            {['male', 'female', 'other'].map((genderOption) => (
                                <label key={genderOption} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={genderOption}
                                        checked={formData.gender === genderOption}
                                        onChange={handleGenderChange}
                                        className="mr-2"
                                    />
                                    {genderOption.charAt(0).toUpperCase() + genderOption.slice(1)}
                                </label>
                            ))}
                            {formData.gender === 'other' && (
                                <div>
                                    <input
                                        ref={otherGenderRef}
                                        className="border rounded px-2 py-1 w-full"
                                        placeholder="Specify other"
                                        value={formData.otherGender}
                                        onChange={handleChange('otherGender')}
                                    />
                                </div>
                            )}
                        </div>


                    </div>

                    {/* Date of Birth */}
                    <div className={FieldContainer}>
                        <label className={MPFLabel}>Date of Birth</label>
                        <div className="w-2/3 relative">
                            <input
                                type="date"
                                className={`border rounded px-2 py-1 w-full ${isFocused.dob ? 'border-gray-600' : 'border-gray-300'}`}
                                value={formData.dob}
                                onChange={handleChange('dob')}
                                onFocus={() => handleFocus('dob')}
                                onBlur={() => handleBlur('dob')}
                            />
                            {/* {formData.dob ? <FaCheck className={FieldVerify} /> : <FaTimes className={FieldError} />} */}
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center items-center">
                        <button
                            className={`text-[0.9rem] bg-[#2E83DB] hover:bg-[#46A0FC] text-white my-6 rounded-[9px] px-4 py-2 transition-colors duration-300 w-1/4 ${isHovering ? 'bg-blue-700' : ''}`}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            onClick={handlesave}
                        >
                            Save
                        </button>
                    </div>

                    {showErrorModal && (
                        <div className={PopupBG}>
                            <div className={`${PopupContainer} p-6 w-[90%] max-w-sm`} >
                                <h2 className="text-xl font-bold mb-4">Profile Updated</h2>
                                <p className="text-gray-600 mb-6">Profile updated successfully.</p>
                                <div className="flex justify-end gap-2">
                                    <button
                                        className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                                        onClick={() => setShowErrorModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
