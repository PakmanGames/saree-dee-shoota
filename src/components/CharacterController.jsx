import { useRef, useState } from "react"
import { CharacterSoldier } from "./CharacterSoldier"
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

const MOVEMENT_SPEED = 200;

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
    
    // useEffect(() => {
    //     console.log("CharacterController rendered:", {
    //         stateId: state.id,
    //         color: state.state.profile?.color,
    //         userPlayer
    //     });
    // }, [state, userPlayer]);

    useFrame((_, delta) => {
        const angle = joystick.angle; // Get angle from joystick to update player position
        if (joystick.isJoystickPressed() && angle) {
            setAnimation("Run");
            character.current.rotation.y = angle;

            const impulse = {
                x: Math.sin(angle) * MOVEMENT_SPEED * delta,
                y: 0,
                z: Math.cos(angle) * MOVEMENT_SPEED * delta,
            };
    
            rigidbody.current.applyImpulse(impulse, true);
        } else {
            setAnimation("Idle");
        }

        if (isHost()) {
            state.setState("pos", rigidbody.current.translation());
        } else {
            const pos = state.getState("pos");
            if (pos) {
                rigidbody.current.setTranslation(pos);
            }
        }
    });

    return (
        <group ref={group} {...props}>
            <RigidBody 
                ref={rigidbody} 
                colliders={false} 
                linearDamping={12} 
                lockRotations
                type={isHost() ? "dynamic" : "kinematicPosition"}
            >
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