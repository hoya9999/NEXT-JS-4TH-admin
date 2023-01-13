import react from "react";
import BaseLayout from "../components/containers/BaseLayout";

function Box({ children }) {
  console.log(children);
  console.log(react.Children.toArray(children));
  return children;
}

const fruits = [
  { id: 1, name: "apple" },
  { id: 2, name: "kiwi" },
];

export default function App() {
  return (
    <BaseLayout>
        Index Page
    </BaseLayout>
  );
}