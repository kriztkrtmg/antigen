import React, { useContext, useEffect, useState } from "react";
import { allQuestions } from "../../api";
import { AppContext } from "../../context/app.context.js";
import Question from "./Question.js";
import Survey from "./Survey";
import MenuComponent from "../../components/menu/MenuComponent";

function Qns() {
  const [questions, setQuestions] = useState([]);
  const [cardValues, setCardValues] = useState({
    question: "",
    survey: "",
    symptom: "",
    notification: "",
  });

  const questionData = [
    { name: "question", count: cardValues.question },
    { name: "survey", count: cardValues.survey },
    { name: "symptoms", count: cardValues.symptom },
    { name: "notifications", count: cardValues.notification },
  ];

  const { token } = useContext(AppContext);

  const [choose, setChoose] = useState("");

  const fetchQuestions = async () => {
    const data = await allQuestions({ token: token, usertype: "dashboard" });
    console.log(data);
    if (data.code === "200") {
      setQuestions(data.questionsall);
      setCardValues(data.questions[0]);
    }
  };

  useEffect(() => {
    async function myFunction() {
      await fetchQuestions();
    }
    myFunction();
  }, []);

  return (
    <main className="mb-14">
      <MenuComponent setChoose={setChoose} menuItem={questionData} />
      {choose === "question" ? (
        <Question allQuestions={questions} fetchQuestions={fetchQuestions} />
      ) : choose === "survey" ? (
        <Survey allQuestions={questions} fetchQuestions={fetchQuestions} />
      ) : (
        <Question allQuestions={questions} fetchQuestions={fetchQuestions} />
      )}
    </main>
  );
}

export default Qns;
