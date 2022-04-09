import React from 'react';
import styled from 'styled-components';
import DateRangeIcon from "@mui/icons-material/DateRange";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoopIcon from "@mui/icons-material/Loop";
import ReplyIcon from "@mui/icons-material/Reply";
import TweetModal from '../Modals/TweetModal';

const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageStyle = styled.img`
	min-width: 50px;
	min-height: 50px;
	max-width: 50px;
	max-height: 50px;
	// overflow: hidden;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 15px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const Username = styled.h5`
	color: #0087fa;
	font-size: 15px;
	font-weight: bold;
	margin-bottom: 1px;
`;

const Tweet = styled.h6`
	color: black;
	font-size: 13px;
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2; /* number of lines to show */
	line-clamp: 2;
	-webkit-box-orient: vertical;
`;

const Info = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: 5px;
`;

const LikeBox = styled.div`
	display: flex;
	flex-direction: row;
	margin-right: 40px;
	font-size: 13px;
	// color: rgba(0,0,0,0.5);
`;

const SearchResult = (props) => {

  const tweet = props.tweet;

  const dt = new Date(tweet.date);

  return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				minWidth: "100%",
				// height: "60px",
				border: "1px solid #ced4d8",
				borderRadius: "3px",
				marginTop: "15px",
				padding: "10px",
				background: "rgba(0,0,0,0.07)",
			}}
		>
			<Header>
				{tweet.thumbnail ? (
					<ImageStyle src={tweet.thumbnail} alt="new" />
				) : (
					<ImageStyle
						src={"assets/brand-download-img-1.jpg.twimg.1920.jpg"}
						alt="new"
					/>
				)}
				<Content>
					<Username>{tweet.username[0]}</Username>

					<Tweet>{tweet.tweet[0]}</Tweet>

					<Info>
						<LikeBox style={{ flex: "2" }}>
							<DateRangeIcon
								style={{
									fontSize: "20",
									color: "black",
								}}
							/>
							{dt.toLocaleDateString("en-us", {
								weekday: "long",
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</LikeBox>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								alignContent: "flex-end",
							}}
						>
							<LikeBox style={{ flex: "1" }}>
								<FavoriteIcon
									style={{
										fontSize: "20",
										color: "black",
									}}
								/>
								{tweet.nlikes}
							</LikeBox>
							<LikeBox style={{ flex: "1" }}>
								<LoopIcon
									style={{
										fontSize: "20",
										color: "black",
									}}
								/>
								{tweet.nretweets}
							</LikeBox>
							<LikeBox style={{ flex: "1" }}>
								<ReplyIcon
									style={{
										fontSize: "20",
										color: "black",
									}}
								/>
								{tweet.nreplies}
							</LikeBox>
						</div>
						<TweetModal tweet={tweet} />
					</Info>
				</Content>
			</Header>
		</div>
  );
}

export default SearchResult;