import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";
import { Link, useOutletContext } from "react-router-dom";
import Loader from "./Loader";

const getTopics = gql`
  query SearchTopics($search: String!) {
    search(query: $search, type: REPOSITORY, first: 20) {
      edges {
        node {
          ... on Repository {
            id
            name
            stargazers {
              totalCount
            }
            stargazerCount
            homepageUrl
            description
            url
            updatedAt
            nameWithOwner
          }
        }
      }
    }
  }
`;
export default function TopicLists() {
  const { searchValue } = useOutletContext();
  const { data, loading, error, refetch } = useQuery(getTopics, {
    variables: { search: searchValue },
  });

  useEffect(() => {
    refetch();
  }, [refetch, searchValue]);
  console.log("data: ", searchValue, data);

  if (!loading && data?.search.edges.length) {
    return (
      <Box data-testid="topicLists">
        <Typography component="h6" align="left">
          Results for query <strong>{searchValue}</strong>
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {data.search.edges.map((search, index) => (
            // <div key={`search-result-${index}`}>{search.node.resourcePath}</div>
            <Grid item xs={12} sm={4} md={3} key={`search-result-${index}`}>
              <Card key={`search-result-${index}`}>
                {/* <Link to={`/${search.node.id}`}> */}
                <CardContent>
                  <Link to={`/${search.node.name}`}>
                    <Typography variant="h5">{search.node.name}</Typography>
                  </Link>
                  <Typography variant="body1">
                    {search.node.nameWithOwner}
                  </Typography>
                </CardContent>
                <CardActionArea align="right">
                  <Typography variant="body2">
                    Stargazer Count: {search.node.stargazerCount}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (!loading && !data?.search.edges.length) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">
          {" "}
          No Topics found for query <strong>{searchValue}</strong> :(
        </Typography>
      </Box>
    );
  }
  if (error) {
    return <Box sx={{ mt: 2 }}>Error: {error.message}</Box>;
  }
  if (loading) {
    return <Loader status={loading} />;
  }
  return <></>;
}
