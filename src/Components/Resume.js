import React, { memo, useMemo } from "react";
import { SectionWithHeader, InfoItem } from "../utils/components";

const Resume = ({ data }) => {
  // Memoize expensive list computations - must be called before any early returns
  const educationList = useMemo(() => 
    data?.education?.map((edu) => (
      <InfoItem
        key={edu.school}
        title={edu.school}
        subtitle={edu.degree}
        date={edu.graduated}
        description={edu.description}
      />
    )) || [], [data?.education]);
  
  const workList = useMemo(() =>
    data?.work?.map((job) => (
      <InfoItem
        key={job.company}
        title={job.company}
        subtitle={job.title}
        date={job.years}
        description={job.description}
      />
    )) || [], [data?.work]);
  
  const skillsList = useMemo(() =>
    data?.skills?.map((skill) => {
      const className = `bar-expand ${skill.name.toLowerCase()}`;
      return (
        <li key={skill.name}>
          <span style={{ width: skill.level }} className={className}></span>
          <em>{skill.name}</em>
        </li>
      );
    }) || [], [data?.skills]);

  if (!data) return null;

  const { skillmessage } = data;

  return (
    <section id="resume">
      <SectionWithHeader headerTitle="Education" className="education">
        <div className="row item">
          <div className="twelve columns">{educationList}</div>
        </div>
      </SectionWithHeader>

      <SectionWithHeader headerTitle="Work" className="work">
        {workList}
      </SectionWithHeader>

      <SectionWithHeader headerTitle="Skills" className="skill">
        <p>{skillmessage}</p>
        <div className="bars">
          <ul className="skills">{skillsList}</ul>
        </div>
      </SectionWithHeader>
    </section>
  );
};

export default memo(Resume);
