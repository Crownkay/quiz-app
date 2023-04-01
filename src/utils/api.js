export async function getQuizData(category, difficulty, numQuestions){
  const apiUrl= 'https://opentdb.com/api.php?amount=30&category=9&difficulty=medium&type=multiple';
  const response = await fetch(apiUrl);

  if(!response.ok){
    throw new Error('Failed to fetch quiz data')
  }

  const data = await response.json()
  const formattedData = formatQuizData(data.results);
  return formattedData;
}

function formatQuizData(quizData){
  return quizData.map((question)=>({
    question: question.question,
    options: shuffleArray([...question.incorrect_answers, question.correct_answer]),
    correct_answer: question.correct_answer,
  }))
  
}

function shuffleArray(array){
  //Fisher-Yates shuffle alogrithm
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}