import React, { useState } from 'react';
import styles from './ProjectView.module.css';

const ProjectDetails = ({ project }:any) => {
    const [hoveredPlotId, setHoveredPlotId] = useState(null);

    const handleMouseEnter = (id:any) => {
        setHoveredPlotId(id);
    };

    const handleMouseLeave = () => {
        setHoveredPlotId(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.plotsSection}>
                <h2>Plots</h2>
                <div className={styles.plots}>
                    {project.plots.map((plot:any) => (
                        <div
                            key={plot.id}
                            className={styles.plot}
                            style={{ backgroundColor: plot.sold ? 'green' : 'white' }}
                            onMouseEnter={() => handleMouseEnter(plot.plot_id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div>{plot.area}</div>
                            {/*{hoveredPlotId === plot.plot_id && (*/}
                            {/*    <div className={styles.plotId}>{plot.plot_id}dss</div>*/}
                            {/*)}*/}
                        </div>
                    ))}
                </div>

            </div>
            <div className={styles.detailsSection}>
                <h2>Project Details</h2>
                <p><strong>Name:</strong> {project.name}</p>
                <p><strong>Address:</strong> {project.address}</p>
                <p><strong>Area:</strong> {project.area} sq. ft.</p>
                <p><strong>Unit Price:</strong> {project.unit_price}</p>
                <p><strong>Total Price:</strong> {project.total_price}</p>
                <p><strong>Selling Price:</strong> {project.selling_price}</p>
                <p><strong>Sold:</strong> {project.sold ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
};

export default ProjectDetails;
