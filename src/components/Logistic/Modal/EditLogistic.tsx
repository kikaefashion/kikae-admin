"use client";

import Loader from "@/components/Loader";
import { addLogisticDestination } from "@/networking/endpoints/logistics/addLogisticDestination";
import { getLogistic } from "@/networking/endpoints/logistics/getLogistic";
import { getStates } from "@/networking/endpoints/logistics/getStates";
import { removeLogisticDestination } from "@/networking/endpoints/logistics/removeLogisticDestination";
import { updateLogistic } from "@/networking/endpoints/logistics/updateLogistic";
import { updateLogisticDestination } from "@/networking/endpoints/logistics/updateLogisticDestination";
import type { LogisticsType } from "@/types/logisticsType";
import type { stateType } from "@/types/stateType";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { IoTrashBin } from "react-icons/io5";

const EditLogisticsProvider = ({
  closeModal,
  handleGetLogistic,
}: {
  closeModal: () => void;
  handleGetLogistic: () => void;
}) => {
  return (
    <Suspense>
      <EditLogistics
        closeModal={closeModal}
        handleGetLogistic={handleGetLogistic}
      />
    </Suspense>
  );
};

function EditLogistics({
  closeModal,
  handleGetLogistic,
}: {
  closeModal: () => void;
  handleGetLogistic: () => void;
}) {
  const logistic_id = useSearchParams().get("logistic");
  const [logistic, setLogistic] = useState<LogisticsType | null>(null);
  const [states, setStates] = useState<stateType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogisticLoading, setIsLogisticLoading] = useState(true);

  const [selectedStateForNewDestination, setSelectedStateForNewDestination] =
    useState<string>("");

  const addDestination = () => {
    if (!logistic || !selectedStateForNewDestination) {
      alert("Please select a state first");
      return;
    }

    const selectedState = states.find(
      (s) => s.id === Number(selectedStateForNewDestination)
    );
    if (!selectedState) return;

    const updatedLogistic = {
      ...logistic,
      destinations: [
        ...logistic.destinations,
        {
          id: 0,
          logistic_id: "",
          state_id: String(selectedState.id),
          area: "",
          cost: "",
          state: { name: selectedState.name, id: selectedState.id },
        },
      ],
    };
    if (!updatedLogistic) return;

    setLogistic(updatedLogistic);
    setSelectedStateForNewDestination("");
  };

  const removeDestination = async (index: number, id: string | number) => {
    if (!logistic) return;
    const updatedLogistic = {
      ...logistic,
      destinations: logistic.destinations.filter((_, i) => i !== index),
    };
    await removeLogisticDestination(id);
    setLogistic(updatedLogistic);
  };

  const handleDestinationChange = (
    index: number,
    field: "area" | "cost",
    value: string
  ) => {
    if (!logistic) return;
    const updatedDestinations = [...logistic.destinations];
    updatedDestinations[index][field] = value;
    const updatedLogistic = {
      ...logistic,
      destinations: updatedDestinations,
    };
    setLogistic(updatedLogistic);
  };

  const handleUpdateLogistic = async () => {
    if (
      !logistic?.id ||
      !logistic?.name ||
      !logistic?.email ||
      !logistic?.phone
    )
      return;
    setIsLoading(true);
    await updateLogistic(
      logistic?.id,
      logistic?.name,
      logistic?.email,
      logistic?.phone,
      logistic?.extra_pickup_increment,
      logistic?.extra_weight_fee
    );
    handleGetLogistic();
    closeModal();
    setIsLoading(false);
  };

  useEffect(() => {
    const handleGetLogistic = async () => {
      if (!logistic_id) return;
      const logisticResult = await getLogistic(logistic_id);
      const stateResult = await getStates();
      setStates(stateResult.data);
      setLogistic(logisticResult.data);
      setIsLogisticLoading(false);
    };

    handleGetLogistic();
  }, [logistic_id]);

  const handleUpdateLogistination = async (
    id: string | number,
    destination_id: string | number,
    area: string,
    cost: string,
    state_id: string | number
  ) => {
    if (!destination_id || !state_id) {
      addLogisticDestination(id, area, cost, state_id);
      return;
    }

    updateLogisticDestination(id, destination_id, area, cost, state_id);
  };

  type DestinationWithIndex = LogisticsType["destinations"][number] & {
    originalIndex: number;
  };

  const groupedDestinations = logistic?.destinations.reduce(
    (acc, destination, index) => {
      const stateId = destination.state.id || 0;
      if (!acc[stateId]) {
        acc[stateId] = {
          stateName: destination.state.name || "Unknown State",
          destinations: [],
        };
      }
      acc[stateId].destinations.push({ ...destination, originalIndex: index });
      return acc;
    },
    {} as Record<
      number,
      { stateName: string; destinations: DestinationWithIndex[] }
    >
  );

  if (isLogisticLoading) return <Loader />;
  if (!logistic) {
    return (
      <div className="text-black">
        <h4>Failed to get logistic details</h4>
      </div>
    );
  }

  return (
    <div className="text-black">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Edit Logistics Provider
      </h2>
      <input
        type="text"
        placeholder="Company name"
        className="w-full border p-3.5 rounded-3xl mb-3"
        value={logistic?.name || ""}
        defaultValue={logistic?.name}
        onChange={(e) => setLogistic({ ...logistic, name: e.target.value })}
      />

      <h3 className="text-lg font-medium mb-2 text-center">
        Destinations & Delivery Fees
      </h3>

      <div className="mb-4 space-y-4">
        {groupedDestinations &&
          Object.entries(groupedDestinations).map(([stateId, group]) => (
            <div key={stateId} className="border rounded-lg p-3 bg-gray-50">
              <h4 className="font-semibold text-md mb-2 text-kikaeBlue">
                {group.stateName}
              </h4>
              <div className="space-y-2">
                {group.destinations.map((destination) => (
                  <div
                    key={destination.originalIndex}
                    className="flex space-x-2 items-center pl-4"
                  >
                    <input
                      type="text"
                      value={destination.area}
                      onChange={(e) =>
                        handleDestinationChange(
                          destination.originalIndex,
                          "area",
                          e.target.value
                        )
                      }
                      placeholder="Area/Destination"
                      className="flex-1 border p-3.5 rounded-3xl"
                    />
                    <input
                      type="text"
                      value={destination.cost}
                      onChange={(e) =>
                        handleDestinationChange(
                          destination.originalIndex,
                          "cost",
                          e.target.value
                        )
                      }
                      placeholder="Fee (₦)"
                      className="w-[25%] border p-3.5 rounded-3xl"
                    />

                    <button
                      className="text-kikaeBlue"
                      onClick={() =>
                        handleUpdateLogistination(
                          logistic.id,
                          destination.id,
                          destination.area,
                          destination.cost,
                          destination?.state?.id
                        )
                      }
                      title="Save changes"
                    >
                      <Check />
                    </button>

                    <button
                      className="text-red-500"
                      onClick={() =>
                        removeDestination(
                          destination.originalIndex,
                          destination.id
                        )
                      }
                      title="Delete destination"
                    >
                      <IoTrashBin />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className="mb-3 p-3 border rounded-lg bg-blue-50">
        <p className="text-sm font-medium mb-2">Add New Destination</p>
        <div className="flex space-x-2 items-center">
          <select
            value={selectedStateForNewDestination}
            onChange={(e) => setSelectedStateForNewDestination(e.target.value)}
            className="flex-1 border p-3.5 rounded-3xl cursor-pointer"
          >
            <option value="">Select state</option>
            {states.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <button
            className="text-kikaeBlue font-medium px-4"
            onClick={addDestination}
          >
            + Add
          </button>
        </div>
      </div>

      <input
        defaultValue={logistic?.phone}
        value={logistic?.phone || ""}
        onChange={(e) => setLogistic({ ...logistic, phone: e.target.value })}
        type="text"
        placeholder="Company Contact Number"
        className="w-full border p-3.5 rounded-3xl mb-3"
      />
      <input
        defaultValue={logistic?.email}
        value={logistic?.email || ""}
        onChange={(e) => setLogistic({ ...logistic, email: e.target.value })}
        type="email"
        placeholder="Company Email"
        className="w-full border p-3.5 rounded-3xl mb-3"
      />
      <div className="flex space-x-2 mb-2 items-center">
        <input
          type="number"
          value={logistic?.extra_pickup_increment}
          onChange={(e) =>
            setLogistic({
              ...logistic,
              extra_pickup_increment: Number(e.target.value),
            })
          }
          placeholder="Extra Pickup Increment (₦)"
          className="flex-1 border p-3.5 rounded-3xl w-[40%]"
        />
        <input
          type="number"
          value={logistic.extra_weight_fee}
          onChange={(e) =>
            setLogistic({
              ...logistic,
              extra_weight_fee: Number(e.target.value),
            })
          }
          placeholder="Extra Weight Fee (₦)"
          className="flex-1 border p-3.5 rounded-3xl w-[40%]"
        />
      </div>
      <button
        onClick={handleUpdateLogistic}
        className="w-full bg-kikaeBlue text-white p-3.5 rounded-3xl mb-2"
      >
        {isLoading ? <Loader /> : "update logistics provider"}
      </button>
      <button onClick={closeModal} className="w-full border p-3.5 rounded-3xl">
        Cancel
      </button>
    </div>
  );
}

export default EditLogisticsProvider;
