'use client'

import React from "react";
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
import Projects_list from "./projects_list.js";
import { useState } from 'react';
import { Modal, Carousel } from 'antd';
import { ArrowIcon } from './icons';


export default function ProjectCard(tags: any) {

  const selectedYear = useState<string | number>("Latest")[0];
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleCardClick = (project: any) => {
    setSelectedProject(project);
    setModalVisible(true);
  };

  const handleCarouselChange = (currentSlideIndex: any) => {
    setCurrentImageIndex(currentSlideIndex);
  };

  const isVideo = (mediaItem: string) => mediaItem && mediaItem.endsWith('.mp4');

  const filterProjectsByYear = (project: any) => {
    if (!project.time) return selectedYear === 'Latest';
    const projectYear = project.time.split('/')[2];
    return selectedYear === 'Latest' || projectYear === selectedYear;
  };

  const sortedProjects = Projects_list.Projects.filter(filterProjectsByYear).sort((a: any, b: any) => {
    if (!a.time) return -1;
    if (!b.time) return 1;
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });

  const colors = ['#2a9d8f', '#f4a261', '#e76f51', '#264653'];

  return (
    <div className="flex flex-col flex-wrap justify-around mx-auto">
      {sortedProjects.map((project, index) => (
        <Card
          isPressable
          isHoverable
          key={index}
          className="flex flex-row al p-4 my-4 w-full gap-4"
          onClick={() => handleCardClick(project)}
        >
          <div className="flex-shrink-0">
            <CardBody
              className="overflow-visible py-2"
            >
              {project.mediaUrl && project.mediaUrl.length > 0 ? (
                isVideo(project.mediaUrl[1]) ? (
                  <video
                    className="object-cover rounded-xl border-2 w-80 h-48 border-gray-100"
                    width={300}
                    controls
                    autoPlay
                    muted
                  >
                    <source
                      src={project.mediaUrl[1]}
                      type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    alt="Project media"
                    className="object-cover rounded-xl w-80 h-48"
                    src={project.mediaUrl[1]}
                  />
                )
              ) : (
                <Image
                  loading="eager"
                  alt="Placeholder image"
                  className="object-cover rounded-xl w-80 h-48"
                  src="/data/images/placekeeping.jpg"
                />
              )}
            </CardBody>
          </div>
          <div className="flex flex-col gap-2">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-lg">{project.title || "No Title"}</h4>
              <small className="text-gray-500">{project.time}</small>
              <p>{project.short_description || project.description}</p>
            </CardHeader>
            {project.tags && project.tags.length > 0 && (
              <Chip className="flex flex-row gap-1">
                {project.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    style={{ color: colors[0] }}
                    className="text-blue px-3 py-1 rounded-full text-sm whitespace-nowrap">
                    # {tag}
                  </div>
                ))}
              </Chip>
            )}
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noreferrer"
                className="text-black-500 mt-2 inline-block">
                Visit Project
                <ArrowIcon />
              </a>
            )}
          </div>
        </Card>
      ))}
      <Modal
        title="Project Details"
        centered
        onCancel={() => { setModalVisible(false); setSelectedProject(null); }}
        open={modalVisible}
        className="h-3/4 w-3/4"
        footer={null}
      >
        {selectedProject && (
          <>
            <h2>{selectedProject.title}</h2>
            <p><strong>Time:</strong> {selectedProject.time}</p>
            <p><strong>Description:</strong> {selectedProject.description}</p>
            {selectedProject.mediaUrl && selectedProject.mediaUrl.length > 0 && (
              <Carousel afterChange={handleCarouselChange}>
                {selectedProject.mediaUrl.map((url: string, index: number) => (
                  isVideo(url) ? (
                    <video key={index} controls>
                      <source src={url} type="video/mp4" />
                    </video>
                  ) : (
                    <img key={index} src={url} alt={selectedProject.title} />
                  )
                ))}
              </Carousel>
            )}
            {selectedProject.project_url && (
              <a
                href={selectedProject.project_url}
                target="_blank"
                rel="noreferrer"
                className="text-black-500 mt-2 inline-block">
                Visit Project
                <ArrowIcon />
              </a>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}