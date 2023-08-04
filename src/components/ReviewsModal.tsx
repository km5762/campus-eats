import {
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContentIDs } from "../contexts/ContentIDProvider";
import {
  CacheMissError,
  queryCache,
  queryThroughCache,
} from "../services/cache";
import { Close } from "@mui/icons-material";
import "../styles/reviews-modal.css";
import ReviewCard, { ReviewData } from "./ReviewCard";

export default function ReviewsModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { contentIDs } = useContentIDs();
  const dishID = open ? contentIDs.dishID : undefined;
  const locationID = contentIDs.locationID;
  const name = open
    ? (queryCache(`location.${locationID}`) as any[])?.find(
        (dish) => dish.id === dishID
      )?.name
    : undefined;
  const [loading, setLoading] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (dishID) {
        setReviewData(await queryThroughCache(`dish.${dishID}`));
      }
      setLoading(false);
    })();
  }, [dishID]);

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return (
    <Modal
      disableScrollLock={true}
      onClose={() => setOpen(false)}
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper
        style={{
          height: "80vh",
          backgroundColor: "#f5f5f5",
          padding: "0.75rem 1.5rem",
          overflow: "hidden",
          width: "min(100vw, 900px)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant={"h6"}>Reviews for {name}</Typography>
          <IconButton
            size="small"
            edge="end"
            sx={{ padding: 0, minHeight: 0, minWidth: 0, margin: 0 }}
            disableRipple={true}
          >
            <Close
              sx={{
                "&:hover": {
                  color: "tomato",
                },
              }}
              style={{ padding: "0", margin: "0" }}
            />
          </IconButton>
        </div>
        <div
          style={{
            overflowY: "scroll",
            maxHeight: "70vh",
            padding: isMobile ? "0.8rem" : "3px",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            reviewData.map((review) => (
              <ReviewCard {...review} key={review.id} />
            ))
          )}
        </div>
      </Paper>
    </Modal>
  );
}
