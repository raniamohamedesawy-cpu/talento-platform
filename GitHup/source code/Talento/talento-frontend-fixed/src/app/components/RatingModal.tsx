import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Star } from "lucide-react";

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  userName: string;
  skill: string;
  onSubmit: (rating: number, review: string) => void;
}

export function RatingModal({ open, onClose, userName, skill, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, review);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Rate Your Session</DialogTitle>
          <p className="text-sm text-[var(--muted-foreground)]">
            {skill} with {userName}
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label className="mb-3 block">How was your experience?</Label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= (hoveredRating || rating)
                        ? "fill-[var(--primary)] text-[var(--primary)]"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-[var(--muted-foreground)] mt-2">
                {rating === 5 && "Excellent!"}
                {rating === 4 && "Very Good!"}
                {rating === 3 && "Good"}
                {rating === 2 && "Could be better"}
                {rating === 1 && "Needs improvement"}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="review" className="mb-2 block">
              Share your feedback (optional)
            </Label>
            <Textarea
              id="review"
              placeholder="What did you learn? How was the teaching style?"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={rating === 0}
            onClick={handleSubmit}
            className="bg-[var(--primary)] text-[var(--navy)] hover:bg-[var(--primary-hover)]"
          >
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
