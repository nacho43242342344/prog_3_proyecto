import React from "react";
import ContentItem from '../ContentItem/ContentItem';
import './GroupContent.css';

const GroupContent = ({ data }) => {

    return (
        <div className="content-group">
            {data.slice(0, 5).map((item) => (
                <ContentItem key={item.id} data={item} />
            ))}
        </div>
    );
};

export default GroupContent;
