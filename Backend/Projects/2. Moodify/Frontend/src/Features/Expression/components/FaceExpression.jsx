/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import {
    FaceLandmarker,
    FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function FaceExpression() {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const animationRef = useRef(null);
    let stream;

    const [expression, setExpression] = useState("😐 Neutral");

    const init = async () => {
        try {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );

            landmarkerRef.current =
                await FaceLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath:
                            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                    },
                    outputFaceBlendshapes: true,
                    runningMode: "VIDEO",
                    numFaces: 1,
                });

            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }

            detect();
        } catch (error) {
            console.error("Initialization Error:", error);
        }
    };

    const detect = () => {
        if (!landmarkerRef.current || !videoRef.current) {
            animationRef.current = requestAnimationFrame(detect);
            return;
        }

        const results = landmarkerRef.current.detectForVideo(
            videoRef.current,
            // eslint-disable-next-line react-hooks/purity
            performance.now()
        );

        if (
            results.faceBlendshapes &&
            results.faceBlendshapes.length > 0
        ) {
            const blendshapes = results.faceBlendshapes[0].categories;

            const getScore = (name) =>
                blendshapes.find(
                    (item) => item.categoryName === name
                )?.score || 0;

            const smile =
                (getScore("mouthSmileLeft") +
                    getScore("mouthSmileRight")) /
                2;

            const surprise =
                (getScore("jawOpen") +
                    getScore("eyeWideLeft") +
                    getScore("eyeWideRight")) /
                3;

            const sad =
                (getScore("browInnerUp") +
                    getScore("mouthFrownLeft") +
                    getScore("mouthFrownRight")) /
                3;

            let emotion = "😐 Neutral";

            if (smile > 0.5) {
                emotion = "😊 Happy";
            } else if (surprise > 0.2) {
                emotion = "😲 Surprised";
            } else if (sad > 0.0001) {
                emotion = "😢 Sad";
            }

            setExpression(emotion);
        }
    };

    useEffect(() => {

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div
            style={{
                textAlign: "center",
                padding: "20px",
            }}
        >
            <h1>Face Expression Detector</h1>

            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                    width: "500px",
                    borderRadius: "12px",
                    border: "2px solid #ddd",
                }}
            />

            <h2
                style={{
                    marginTop: "20px",
                    fontSize: "2rem",
                }}
            >
                {expression}
            </h2>
            <button onClick={detect} >Detect expression</button>
        </div>
    );
}