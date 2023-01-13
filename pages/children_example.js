import react from "react";

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
    <Box>
      <div name="banana">banana</div>
      {fruits.map(fruit => (
        <div key={`${fruit.id}_${fruit.name}`} name={fruit.name}>
          {fruit.name}
        </div>
      ))}
    </Box>
  );
}