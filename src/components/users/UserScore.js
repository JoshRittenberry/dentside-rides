import React, { useEffect, useState } from "react";
import { getPostLikesByPostId } from "../../services/postService";
import "./UserScore.css";
import { useLocation } from "react-router-dom";

export const UserScore = ({ userAccount }) => {
    const [userPostInteractions, setUserPostInteractions] = useState([]);
    const [rating, setRating] = useState(0);
    const [showText, setShowText] = useState(false)
    const location = useLocation()

    // This function now calculates the rating based on the upvotes and downvotes
    const calculateRating = (upvotes, totalVotes) => {
        if (totalVotes === 0) return 0;
        return Math.round((upvotes / totalVotes) * 5);
    };

    useEffect(() => {
        if (!userAccount.posts) return;

        // Fetch likes for all posts and then update state once
        const postLikesPromises = userAccount.posts.map(post =>
            getPostLikesByPostId(post.id)
        );

        Promise.all(postLikesPromises).then(results => {
            const allLikes = results.flat(); // Assuming each result is an array of likes
            setUserPostInteractions(allLikes);

            const upvotesCount = allLikes.filter(like => like.status === true).length;
            const totalVotes = allLikes.length;
            const newRating = calculateRating(upvotesCount, totalVotes);

            setRating(newRating);
        });

        const userAccountRegex = /^\/user_account\/\d+$/

        if (location.pathname === "/my_account" || location.pathname === "/user_account/" || userAccountRegex.test(location.pathname)) {
            setShowText(true);
        } else {
            setShowText(false);
        }
    }, [userAccount]);

    return (
        <>
            {showText && (
                `Total Post Interactions: ${userPostInteractions.length}`
            )}

            <div className="user-score-stars" data-rating={rating}>
                {[...Array(5)].map((_, index) => (
                    <i
                        key={index}
                        className={`fa-solid fa-star ${index < rating ? "filled" : ""}`}
                    />
                ))}
            </div>
        </>
    );
};
