"use client";

import React, { useEffect, useState } from 'react';
import { Tabs, Divider } from 'antd';
import { ArrowIcon } from '../components/icons';
import Bibliography from './bibliography';
import Resume from './resume.json';

const { TabPane } = Tabs;

const Projects: React.FC = () => {

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tighter">Experiences</h1>
      <a
        className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.linkedin.com/in/zhiyao-shu-4b4b0016b/"
      >
        <u className="mr-2 h-7">resume/cv.pdf</u>
        <ArrowIcon />
      </a>
      <Tabs>
        <TabPane tab="Practices" key="practices">
          <div>
            <h2 className="text-xl font-semibold">Experience</h2>
            {Resume.Experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="font-bold">{exp.position}</div>
                <div >{exp.company}</div>
                <div className="italic">{exp.period}</div>

                {exp.location && <div>{exp.location}</div>}
                <ul>
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
            <Divider />
            <h2 className="text-xl font-semibold">Education & Certification</h2>
            {Resume.Education_Certification.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="font-bold">{edu.institution}</div>
                <div className="italic">{edu.period}</div>
                {edu.degree && <div>{edu.degree}</div>}
                {edu.location && <div>{edu.location}</div>}
                <ul>
                  {edu.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </TabPane>
        <TabPane tab="Publication" key="publication">
          <Bibliography />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Projects;
