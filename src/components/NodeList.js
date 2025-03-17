import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, List, ListItem, Divider } from "@mui/material";
import axios from "axios";

const BESU_NODE_URL = "http://127.0.0.1:8550";

const NodeList = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      const response = await axios.post(BESU_NODE_URL, {
        jsonrpc: "2.0",
        method: "admin_peers",
        params: [],
        id: 1,
      });
      setNodes(response.data.result || []);
    } catch (error) {
      console.error("Error fetching nodes:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h5">🔗 Connected Nodes</Typography>
      <Card sx={{ marginTop: "20px", padding: "10px" }}>
        <CardContent>
          <List>
            {nodes.length > 0 ? (
              nodes.map((node, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <Typography>
                      {index + 1}. {node.id} - {node.network.remoteAddress}
                    </Typography>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Typography>No nodes connected</Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NodeList;
