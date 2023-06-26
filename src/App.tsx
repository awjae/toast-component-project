import React from "react";
import { useToast } from "./hooks/useToast";
import styles from "./styles/common.module.css";

function App() {
  const { toast } = useToast();

  return (
    <div className={`grow flex flex-col bg-[#FEFBEF] ${styles.home}`}>
      <div>
        <h1>Example</h1>
        <div className={styles.buttonLayer}>
          <button
            onClick={() => {
              toast({});
            }}
          >
            Default
          </button>
          <button
            onClick={() => {
              toast({
                variant: "success",
                message: "Successfully toasted!",
                duration: 5000,
              });
            }}
          >
            Success
          </button>
          <button
            onClick={() =>
              toast({
                duration: 2000,
                render: () => <div>Hello World</div>,
              })
            }
          >
            Custom
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
