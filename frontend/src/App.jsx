import { Typography, Button, Container, TextField, Link } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [submitUrl, setSubmitUrl] = useState(null);
  const [shortUrl, setShortUrl] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (url) {
      setSubmitUrl(url);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setUrl(value);
  };

  useEffect(() => {
    if (submitUrl) {
      (async function () {
        const response = await axios({
          method: "post",
          url: "http://localhost:8001/url",
          data: {
            url: submitUrl,
          },
        });
        setShortUrl(response.data.id);
      })();
    }
  }, [submitUrl]);

  return (
    <>
      <Container>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          fontWeight="500"
          gutterBottom
          margin="50px"
          color="primary"
        >
          URL Shortner
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={{ marginTop: 10, width: 700 }}
              variant="outlined"
              label="Enter URL"
              onChange={handleChange}
            />
            <Button
              sx={{ marginTop: 10, marginLeft: 7 }}
              variant="contained"
              type="submit"
            >
              Get URL
            </Button>
          </Container>
        </form>
        { shortUrl &&
        <Container
          sx={{
            marginTop: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Link: </Typography>
          <Link href={`http://localhost:8001/url/${shortUrl}`} variant="h4">
               {shortUrl}
          </Link>
        </Container>
}
      </Container>
    </>
  );
}

export default App;
