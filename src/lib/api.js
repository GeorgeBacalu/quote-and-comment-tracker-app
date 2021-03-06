const FIREBASE_DOMAIN = "https://http-requests-ebdd0-default-rtdb.firebaseio.com";

const responseStatusHandler = async (response, errorMessage) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || errorMessage);
  return data;
};

export const getAllQuotes = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await responseStatusHandler(response, "Could not fetch quotes.");
  const transformedQuotes = [];
  for (const key in data) {
    transformedQuotes.push({ id: key, ...data[key] });
  }
  return transformedQuotes;
};

export const getSingleQuote = async quoteId => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const data = await responseStatusHandler(response, "Could not fetch quote.");
  const loadedQuote = { id: quoteId, ...data };
  return loadedQuote;
};

export const addQuote = async quoteData => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: "POST",
    body: JSON.stringify(quoteData),
    headers: { "Content-Type": "application/json" },
  });
  await responseStatusHandler(response, "Could not create quote.");
  return null;
};

export const addComment = async requestData => {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`, {
    method: "POST",
    body: JSON.stringify(requestData.commentData),
    headers: { "Content-Type": "application/json" },
  });
  const data = await responseStatusHandler(response, "Could not add comment.");
  return { commentId: data.name };
};

export const getAllComments = async quoteId => {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);
  const data = await responseStatusHandler(response, "Could not get comments.");
  const transformedComments = [];
  for (const key in data) {
    transformedComments.push({ id: key, ...data[key] });
  }
  return transformedComments;
};
