import PropTypes from "prop-types";
import React, { memo } from "react";

import RoomItem from "../room-item";
import { RoomsWrapper } from "./style";

const SectionPosts = memo((props) => {
  const { roomList, itemWidth } = props;
  return (
    <RoomsWrapper>
      <RoomItem
        itemData={roomList}
        itemWidth={itemWidth}
      />
      ;
    </RoomsWrapper>
  );
});

SectionPosts.propTypes = {
  roomList: PropTypes.array,
};

export default SectionPosts;
