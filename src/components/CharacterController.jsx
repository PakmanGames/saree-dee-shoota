import { useRef, useState, useEffect } from "react"
import { CharacterSoldier } from "./CharacterSoldier"

export const CharacterController = ({
    state,
    joystick,
    userPlayer,
    ...props
}) => {
    const group = useRef();
    const character = useRef();
    const [animation, setAnimation] = useState("Idle");
    
    useEffect(() => {
        console.log("CharacterController rendered:", {
            stateId: state.id,
            color: state.state.profile?.color,
            userPlayer
        });
    }, [state, userPlayer]);

    return (
        <group ref={group} {...props}>
            <group ref={character}>
                <CharacterSoldier
                    color={state.state.profile?.color || "red"}
                    animation={animation}
                />
            </group>
        </group>
    );
}