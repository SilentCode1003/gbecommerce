import React from 'react';
import { Collapse } from 'antd';

// FAQ content
const text = `
The Intelligent LCD UPS is a compact uninterruptible power supply (UPS) designed to provide battery backup and surge protection for devices like desktop computers, workstations, networking equipment, and home entertainment systems.

It features line-interactive topology with Automatic Voltage Regulation (AVR), which helps correct minor power fluctuations without switching to battery power, thereby extending battery life. The UPS also includes a multifunction LCD panel that provides real-time power status and system vitals.
`;

// Nested FAQ items
const itemsNest = [
    {
        key: '1',
        label: <span style={{ color: "" }}>What is the Intelligent LCD UPS?</span>,
        children: <p style={{ color: "" }}>{text}</p>,
    },
];

// Main FAQ sections
const items = [
    {
        key: '1',
        label: <span style={{ color: "" }}>General Information</span>,
        children: <Collapse defaultActiveKey="1" items={itemsNest} style={{ background: "#cacaca" }} />,
    },
    {
        key: '2',
        label: <span style={{ color: "" }}>Technical Specifications</span>,
        children: <p style={{ color: "" }}>{text}</p>,
    },
    {
        key: '3',
        label: <span style={{ color: "" }}>Features & Ports</span>,
        children: <p style={{ color: "" }}>{text}</p>,
    },
];

const ProductTab3 = () => {
    const onChange = (key) => {
        console.log(key);
    };

    return (
        <Collapse
            onChange={onChange}
            items={items}
            style={{
                background: "#f5f5f5",
            }}
        />
    );
};

export default ProductTab3;
