import React from "react";
import { Modal } from "../../../../shared/modal/Modal.tsx";
import { useStore } from "../../../../app/store";
import { HighLights } from "../../../../entities/highLights/HighLights.tsx";

type Props = {
     children: React.ReactNode;
     id: string;
     isSuccess: boolean;
};

export const HistoryPopUp: React.FC<Props> = (props) => {
     const [show, setShow] = React.useState(false);

     const metric = useStore((state) => state.history.metric);
     const getMetric = useStore((state) => state.history.getMetric);

     React.useEffect(() => {
          getMetric(props.id);
     }, [show]);

     const onClose = () => {
          setShow(false);
     };

     return (
          <>
               <div
                    onClick={() => {
                         if (props.isSuccess) {
                              setShow(true);
                         }
                    }}
               >
                    {props.children}
               </div>
               <Modal isOpen={show} onClose={onClose}>
                    {metric ? <HighLights metric={metric} isMain={false} /> : ""}
               </Modal>
          </>
     );
};
