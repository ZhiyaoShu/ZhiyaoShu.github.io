'use client'
import React, { useState } from 'react';
import { Tabs } from 'antd';
import { ArrowIcon } from '../components/icons';

const { TabPane } = Tabs;

export default function Projects() {
    return (
        <div>
            <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
                Experiences
            </h1>
            <a
                className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/zhiyao-shu-4b4b0016b/"
            >
                <u className="mr-2 h-7">cv.pdf</u>
                <ArrowIcon />
            </a>
            <Tabs>
                <TabPane tab="Practices" key="1">

                </TabPane>
                <TabPane tab="Publication" key="2">
                </TabPane>
            </Tabs>
        </div>
    )
}