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
  cache,
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
  const { contentIDs, setContentIDs } = useContentIDs();
  const dishID = open ? contentIDs.dishID : undefined;
  const locationID = contentIDs.locationID;
  const name = open
    ? (queryCache(`location.${locationID}`) as any[])?.find(
        (dish) => dish.id === dishID
      )?.name
    : undefined;
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);

  function handleClose() {
    setContentIDs({ ...contentIDs, dishID: -999 });
    setOpen(false);
    setLoading(true);
    setReviewData([]);
  }

  useEffect(() => {
    const controller = new AbortController();
    let aborted = false;

    (async () => {
      if (dishID) {
        ///Since dishID is set to undefined while the modal is closed, this avoids the effect triggering again
        const signal = controller.signal;
        setLoading(true);
        try {
          setReviewData(await queryThroughCache(`dish.${dishID}`, signal));
        } finally {
          if (!aborted) {
            /// This avoids loading being set to false after the modal is closed in the event that the query is aborted.
            setLoading(false);
          }
        }
      }
    })();
    return () => {
      if (dishID) {
        /// This is to prevent the cleanup function from running when modal goes from closed -> open
        aborted = true;
        controller.abort();
      }
    };
  }, [dishID]);

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return (
    <Modal
      disableScrollLock={true}
      onClose={handleClose}
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper
        style={{
          height: "80vh",
          backgroundColor: "#f5f5f5",
          padding: "0.75rem 1.5rem",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        sx={{ width: "min(100vw, 900px)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant={"h6"}>Reviews for {name}</Typography>
          <IconButton
            size="small"
            edge="end"
            sx={{ padding: 0, minHeight: 0, minWidth: 0, margin: 0 }}
            disableRipple={true}
            onClick={handleClose}
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
            overflowY: "auto",
            maxHeight: "70vh",
            padding: isMobile ? "0.8rem" : "3px",
            justifyContent: reviewData.length === 0 ? "center" : undefined,
            alignItems: reviewData.length === 0 ? "center" : undefined,
            display: "flex",
            flexDirection: "column",
            flex: "1",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : reviewData.length === 0 && loading === false ? (
            <h2 className="empty-message">
              This dish has no reviews.
              <br /> Be the first to add one!
            </h2>
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
