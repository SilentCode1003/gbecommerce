const [suggestionquestion, setQuestions] = React.useState([]);
  const [textLengths, setTextLengths] = React.useState({});
  const handleTextChange = (e, id) => {
    const inputText = e.target.value;

    // Update formData for the corresponding question
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [id]: inputText,
    // }));

    // Update textLengths for the corresponding question
    setTextLengths((prevLengths) => ({
      ...prevLengths,
      [id]: inputText.length,
    }));
  };

  React.useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("api/suggestionquestion/active", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ APK: VITE_API_KEY }),
        });
        const data = await res.json();

        setQuestions(data.data);
      } catch (error) {
        console.log("Error fetching questions:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchQuestions();
  }, []);