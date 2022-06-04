import {
  Card,
  CardActionArea,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useNodes } from "../../../controllers/nodesController";

const NodesPage = () => {
  const { nodes } = useNodes();
  const navigate = useNavigate();

  return (
    <Container>
      <Grid container>
        {nodes &&
          nodes.map((node) => (
            <Grid item xs={12} md={4} key={node._id}>
              <Card
                onClick={() =>
                  navigate(`/${node._id}`, {
                    state: { serialKey: node.serialKey },
                  })
                }
              >
                <CardActionArea>
                  <CardHeader title={node.structure} subheader={node.point} />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default NodesPage;
