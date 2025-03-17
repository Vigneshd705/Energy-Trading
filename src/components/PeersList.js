import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import axios from "axios";

const BESU_NODE_URL = "http://127.0.0.1:8550";

export default function PeersList() {
  const [peerList, setPeerList] = useState([]);

  useEffect(() => {
    fetchPeers();
  }, []);

  const fetchPeers = async () => {
    try {
      const response = await axios.post(BESU_NODE_URL, {
        jsonrpc: "2.0",
        method: "admin_peers",
        params: [],
        id: 3,
      });

      setPeerList(response.data.result || []);
    } catch (error) {
      console.error("Error fetching peer data:", error);
    }
  };

  return (
    <Card sx={{ marginTop: "20px", padding: "10px", textAlign: "left" }}>
      <CardContent>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          🌍 Connected Peer Details
        </Typography>
        {peerList.length > 0 ? (
          <List>
            {peerList.map((peer, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Peer ${index + 1}`}
                    secondary={`ID: ${peer.id} | IP: ${peer.network.remoteAddress}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography color="textSecondary">No peers connected</Typography>
        )}
      </CardContent>
    </Card>
  );
}
