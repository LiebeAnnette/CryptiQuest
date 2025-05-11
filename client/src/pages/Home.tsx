import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CRYPTIDS } from "../utils/queries";

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(QUERY_CRYPTIDS);

  if (loading) return <p>Loading cryptids...</p>;
  if (error) return <p>Error loading cryptids</p>;

  return (
    <div>
      <h1>Cryptids</h1>
      {data.cryptids.map((cryptid: any) => (
        <div key={cryptid._id} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
          <h2>{cryptid.name}</h2>
          <p><strong>Region:</strong> {cryptid.region}</p>
          <p>{cryptid.description}</p>
          {cryptid.image && <img src={cryptid.image} alt={cryptid.name} style={{ maxWidth: "200px" }} />}
        </div>
      ))}
    </div>
  );
};

export default Home;
