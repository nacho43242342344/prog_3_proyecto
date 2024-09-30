import React from "react";
import ContentItem from '../ContentItem/ContentItem';

const GroupContent = ({ data }) => {
    return (
        <div className="content-group">
            {data.map((item) => (
                <ContentItem key={item.id} data={item} />
            ))}
        </div>
    );
};

export default GroupContent;
