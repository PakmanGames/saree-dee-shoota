import { useRef, useState } from "react"
import { CharacterSoldier } from "./CharacterSoldier"
import { RigidBody, CapsuleCollider, vec3 } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

const MOVEMENT_SPEED = 200;
const FIRE_RATE = 380;

// Fix bullet not shooting from gun mesh
export const WEAPON_OFFSET = {
    x: -0.2,
    y: 1.4,
    z: 0.8,
};

export const CharacterController = ({
    state,
    joystick,
    userPlayer,
    onFire,
    ...props
}) => {
    const group = useRef();
    const character = useRef();
    const rigidbody = useRef();
    const controls = useRef();
    const lastShoot = useRef(0);
    const [animation, setAnimation] = useState("Idle");

    useFrame((_, delta) => {
        if (controls.current) {
            const cameraDistanceY = window.innerWidth < 1024 ? 16 : 20;
            const cameraDistanceZ = window.innerWidth < 1024 ? 12: 16;
            const playerWorldPos = vec3(rigidbody.current.translation());
            controls.current.setLookAt(
                playerWorldPos.x,
                playerWorldPos.y + (state.state.dead ? 12 : cameraDistanceY),
                playerWorldPos.z, + (state.state.dead ? 2 : cameraDistanceZ),
                playerWorldPos.x,
                playerWorldPos.y + 1.5,
                playerWorldPos.z,
                true
            );
        }

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

        if (joystick.isPressed("shoot")) {
            setAnimation("Idle_Shoot");
            if (isHost()) {
                if (Date.now() - lastShoot.current > FIRE_RATE) {
                    lastShoot.current = Date.now();
                    const newBullet = {
                        id: state.id + "-" + new Date(),
                        position: vec3(rigidbody.current.translation()),
                        angle,
                        player: state.id,
                    };
                    onFire(newBullet);
                }
            }
        }
    });

    return (
        <group ref={group} {...props}>
            {
                userPlayer && (<CameraControls ref={controls} />)
            }
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
                    { userPlayer && <Crosshair position={[WEAPON_OFFSET.x, WEAPON_OFFSET.y, WEAPON_OFFSET.z]} />}
                </group>
                <CapsuleCollider args={[0.7, 0.6]} position={[0, 1.28, 0]} />
            </RigidBody>
        </group>
    );
}

const Crosshair = (props) => {
    return (
        <group {...props}>
            <mesh position-z={1}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="black" transparent opacity={0.9} />
            </mesh>
            <mesh position-z={2}>
                <boxGeometry arg={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="black" transparent opacity={0.85} />
            </mesh>
            <mesh position-z={3}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="black" transparent opacity={0.8} />
            </mesh>

            <mesh position-z={4.5}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="black" opacity={0.7} transparent />
            </mesh>
            <mesh position-z={6.5}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="black" opacity={0.6} transparent />
            </mesh>
            <mesh position-z={9}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="black" opacity={0.2} transparent />
            </mesh>
        </group>
    );
}