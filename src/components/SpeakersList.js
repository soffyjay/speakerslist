import Speaker from "./Speaker";
import { data } from "../../SpeakerData";
import { useState, useEffect } from "react";
import ReactPlaceholder from "react-placeholder/lib";

function SpeakersList({ showSessions }) {
  const [speakerData, setSpeakerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(2000);
        setLoading(false);
        setSpeakerData(data);
      } catch (e) {
        setLoading(false);
        setHasError(true);
        setError(e);
      }
    }
    delayFunc();
  }, []);

  const onFavoriteToggle = (id) => {
    const speakerRecPrevious = speakerData.find((rec) => {
      return rec.id === id;
    });
    const speakerRecUpdated = {
      ...speakerRecPrevious,
      favorite: !speakerRecPrevious.favorite,
    };
    const speakersDataNew = speakerData.map((rec) => {
      return rec.id === id ? speakerRecUpdated : rec;
    });
    setSpeakerData(speakersDataNew);
  };

  if (hasError === true) {
    return <div>Loading speaker data failed {error}</div>;
  }
  // if (loading === true) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="container spearkers-list">
      <ReactPlaceholder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={loading === false}
      >
        <div className="row">
          {speakerData.map((speaker) => {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                showSessions={showSessions}
                onFavoriteToggle={() => onFavoriteToggle(speaker.id)}
              />
            );
          })}
        </div>
      </ReactPlaceholder>
    </div>
  );
}

export default SpeakersList;
