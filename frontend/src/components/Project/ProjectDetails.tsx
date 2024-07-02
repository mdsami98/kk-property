import React, { useState } from 'react';
import styles from './ProjectView.module.css';
import CustomModal from '../Modal';
import PropertySell from './PropertySell'; // Example component A
import PropertySold from './PropertySold'; // Example component B

const ProjectDetails = ({ project }: any) => {
    const [hoveredPlotId, setHoveredPlotId] = useState<number | string | null>(
        null
    );
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleMouseEnter = (id: number | string) => {
        setHoveredPlotId(id);
    };

    const handleMouseLeave = () => {
        setHoveredPlotId(null);
    };
    const onSubmit = (data) => {};
    const boxOnClick = (plot: any) => {
        console.log(plot);

        // Determine which component to render
        if (plot.sold) {
            setModalContent(<PropertySold plot={plot} />);
        } else {
            setModalContent(
                <PropertySell plot={plot} onSaleSubmit={onSubmit} />
            );
        }

        setModalOpen(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.plotsSection}>
                <h2>Plots</h2>
                <div className={styles.plots}>
                    {project.plots.map((plot) => (
                        <button
                            key={plot.id}
                            className={styles.plot}
                            style={{
                                backgroundColor: plot.sold ? 'green' : 'white',
                                color: plot.sold ? 'white' : 'black'
                            }}
                            onMouseEnter={() => handleMouseEnter(plot.plot_id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => boxOnClick(plot)}
                        >
                            <div>{plot.area}</div>
                            {hoveredPlotId === plot.plot_id && (
                                <div className={styles.plotId}>
                                    {plot.plot_id}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.detailsSection}>
                <h2>Project Details</h2>
                <p>
                    <strong>Name:</strong> {project.name}
                </p>
                <p>
                    <strong>Address:</strong> {project.address}
                </p>
                <p>
                    <strong>Area:</strong> {project.area} sq. ft.
                </p>
                <p>
                    <strong>Unit Price:</strong> {project.unit_price}
                </p>
                <p>
                    <strong>Total Price:</strong> {project.total_price}
                </p>
                <p>
                    <strong>Selling Price:</strong> {project.selling_price}
                </p>
                <p>
                    <strong>Sold:</strong> {project.sold ? 'Yes' : 'No'}
                </p>
            </div>

            <CustomModal
                title='Product Sale Page'
                open={modalOpen}
                setOpen={setModalOpen}
            >
                {modalContent}
            </CustomModal>
        </div>
    );
};

export default ProjectDetails;
