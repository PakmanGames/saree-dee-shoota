import { useRef, useState, useEffect } from "react"
import { CharacterSoldier } from "./CharacterSoldier"
import { RigidBody, CapsuleCollider } from "@react-three/rapier";

export const CharacterController = ({
    state,
    joystick,
    userPlayer,
    ...props
}) => {
    const group = useRef();
    const character = useRef();
    const rigidbody = useRef();
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
            <RigidBody ref={rigidbody} colliders={false}>
                <group ref={character}>
                    <CharacterSoldier
                        color={state.state.profile?.color || "red"}
                        animation={animation}
                    />
                </group>
                <CapsuleCollider args={[0.7, 0.6]} position={[0, 1.28, 0]} />
            </RigidBody>
        </group>
    );
}