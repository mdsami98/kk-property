'use client';
import { useEffect, useState } from 'react';
import { useGetProjectQuery } from "@/redux/slice/project/projectApiSlice";
import ProjectDetails from "@/components/Project/ProjectDetails";

const ProjectView = ({params}:any) => {
    const {id}= params;
    const [projectData, setProjectData] = useState(null);

    const {
        data,
        isLoading,
        isFetching,
        isSuccess,
        isError
    } = useGetProjectQuery(
        { id: id },
        { skip: id === undefined }
    );

    console.log(id, "ds")

    useEffect(() => {
        if (isSuccess && data) {
            setProjectData(data);
        }
    }, [isSuccess, data]);

    if (isLoading || isFetching) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching project data.</div>;
    }
    console.log(projectData)
    if (!projectData) {
        return <div>No data found for project with id {id}</div>;
    }

    return (
        <ProjectDetails project={projectData}/>
    );
};

export default ProjectView;
