import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
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
import { Close, Create, RateReviewOutlined } from "@mui/icons-material";
import "../styles/reviews-modal.css";
import ReviewCard, { ReviewData } from "./ReviewCard";
import AddReviewForm from "./AddReviewForm";
import { useAuth } from "../contexts/AuthProvider";

export default function ReviewsModal({
  open,
  setOpen,
  openAuthModal,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openAuthModal: Function;
}) {
  const { contentIDs, setContentIDs } = useContentIDs();
  const session = useAuth();
  const dishID = open ? contentIDs.dishID : undefined;
  const locationID = contentIDs.locationID;
  const name = open
    ? (queryCache(`location.${locationID}`) as any[])?.find(
        (dish) => dish.id === dishID
      )?.name
    : undefined;
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [isWritingReview, setIsWritingReview] = useState(false);

  function handleClose(fromCloseButton?: boolean) {
    if (!isWritingReview || fromCloseButton) {
      setContentIDs({ ...contentIDs, dishID: -999 });
      setOpen(false);
      setLoading(true);
      setReviewData([]);
      if (isWritingReview) setIsWritingReview(false);
    }
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
      onClose={() => handleClose()}
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper
        style={{
          position: "relative",
          backgroundColor: "#f5f5f5",
          maxHeight: "85vh",
          minHeight:
            loading || (reviewData.length === 0 && !loading && !isWritingReview)
              ? "85vh"
              : undefined,
          padding: "0.75rem 1.25rem",
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
            onClick={() => handleClose(true)}
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
        {isWritingReview ? (
          <AddReviewForm setIsWritingReview={setIsWritingReview} />
        ) : (
          <>
            <div
              style={{
                overflowY: "auto",
                padding: isMobile ? "0.8rem" : "3px",
                justifyContent: reviewData.length === 0 ? "center" : undefined,
                alignItems: reviewData.length === 0 ? "center" : undefined,
                display: "flex",
                flexDirection: "column",
                flex: "1",
                gap: "1rem",
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
            <div style={{ marginTop: "0.75rem" }}>
              {session === undefined ? (
                <CircularProgress style={{ float: "right" }} />
              ) : (
                !isWritingReview && (
                  <Button
                    style={{
                      color: "white",
                      float: "right",
                      border: "solid var(--brandAccent) 1px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                    sx={{
                      backgroundColor: "var(--brand)",
                      "&:hover": {
                        backgroundColor: "var(--brandAccent)",
                      },
                      "&:disabled": {
                        backgroundColor: "var(--brandAccent)",
                      },
                    }}
                    startIcon={<Create />}
                    size="small"
                    onClick={
                      session
                        ? () => setIsWritingReview(true)
                        : () => openAuthModal()
                    }
                    disabled={loading}
                  >
                    {session && "Write a review"}
                    {session === null && "Sign in to add a review!"}
                  </Button>
                )
              )}
            </div>
          </>
        )}
      </Paper>
    </Modal>
  );
}
