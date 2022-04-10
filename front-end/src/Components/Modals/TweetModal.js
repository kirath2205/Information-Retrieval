import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import styled from "@emotion/styled";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoopIcon from "@mui/icons-material/Loop";
import ReplyIcon from "@mui/icons-material/Reply";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ImageStyle = styled.img`
	width: 60px;
	height: 60px;
	// overflow: hidden;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 15px;
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

function MyVerticallyCenteredModal(props) {
	const tweet = props.tweetdata;
	const dt = new Date(tweet.date);
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title
					id="contained-modal-title-vcenter"
					style={{ display: "flex", flexDirection: "row" }}
				>
					{tweet.thumbnail ? (
						<ImageStyle src={tweet.thumbnail} alt="new" />
					) : (
						<ImageStyle
							src={
								"assets/brand-download-img-1.jpg.twimg.1920.jpg"
							}
							alt="new"
						/>
					)}
					<div style={{ display: "flex", flexDirection: "column" }}>
						{tweet.username}
						<a href={tweet.link[0]} style={{ fontSize: "12px" }}>
							{tweet.link[0]}
						</a>
					</div>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
				}}
			>
				<p style={{ marginBottom: "5px" }}>{tweet.tweet[0]}</p>

				{/* {tweet.hashtags && tweet.hashtags.length > 0 && tweet.hashtags.map(h => h)} */}
				<Info style={{ marginTop: "15px" }}>
					<LikeBox>
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
						<LikeBox>
							<FavoriteIcon
								style={{
									fontSize: "20",
									color: "black",
								}}
							/>
							{tweet.nlikes}
						</LikeBox>
						<LikeBox>
							<LoopIcon
								style={{
									fontSize: "20",
									color: "black",
								}}
							/>
							{tweet.nretweets}
						</LikeBox>
						<LikeBox>
							<ReplyIcon
								style={{
									fontSize: "20",
									color: "black",
								}}
							/>
							{tweet.nreplies}
						</LikeBox>
						{tweet.geo ?
							<LikeBox>
								<LocationOnIcon
									style={{
										fontSize: "20",
										color: "black",
									}}
								/>
								{tweet.geo}
							</LikeBox> : null}
					</div>
				</Info>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

function TweetModal(props) {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<OpenInNewIcon
				onClick={() => setModalShow(true)}
				style={{
					fontSize: "20",
					color: "black",
				}}
			/>

			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				tweetdata={props.tweet}
			/>
		</>
	);
}

export default TweetModal;
