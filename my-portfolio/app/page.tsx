'use client'

import * as React from "react";
import Link from "next/link";
import { BackTop } from "antd";
import ProjectCard from "./components/projectList";
import { DownloadIcon } from './components/icons';
import { useState, useEffect } from 'react';
import { Tabs, Modal } from 'antd';
import Projects_list from "./components/projects_list.js";

const { TabPane } = Tabs;

export default function Page() {
  const categories = {
    Latest: 'Latest',
    Types: 'Types',
  };

  const [haveTags, setHaveTags] = useState<boolean>(false);

  return (
    <div>
      <section>
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          Hi, I am Zoey
        </h1>
        <p className="mb-4">
          {`A ML/Full-stack Engineer at Bay area, CA.`}
        </p>
        <div className="my-8">
        </div>
      </section>
      <div className="flex flex-row ">
        <Tabs defaultActiveKey="All">
          <TabPane tab="Latest" key="Latest" >
            <ProjectCard />

          </TabPane>
        </Tabs>
      </div>
      <BackTop visibilityHeight={400} />
    </div>
  )
}