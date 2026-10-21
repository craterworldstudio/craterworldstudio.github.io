# ☀️ Helios Programming Language

A statically-typed, concurrent, task-based programming language engineered specifically for high-throughput distributed game servers and networked runtime environments.

---

## 🎯 Architecture & Design Philosophy

Helios is built on the premise that large-scale multiplayer and server architectures require explicit concurrency models, strict authority boundaries, and zero hidden runtime overhead. 

* **Explicit Over Implicit:** No hidden allocations or implicit variable coercion. Variable declaration (`create`) is strictly decoupled from mutation (`set`).
* **Architectural Execution Roles:** Code units declare their authority and execution lifecycle directly at the file level (`type`).
* **Task-Centric Execution:** All executable logic is strictly encapsulated inside `TASK` and `SubTASK` routines, eliminating uncontrolled global side effects.
* **Hermetic Module Groups:** Every source file belongs to a named `group` with explicit export lists, preventing namespace pollution.

---

## 🏛️ Execution Roles & Authority Model

Files in Helios are categorized by their execution authority:

| Role | Lifecycle | Concurrency & Authority Behavior |
| :--- | :--- | :--- |
| `MASTER` | Lifetime | The root entry point of the compiled executable. Orchestrates workers and system bootstrap. |
| `WORKER` | Lifetime | Long-running service loops and thread groups. Runs indefinitely; flags as `SCARCE` when idle. |
| `WORKER_C` | Lifetime | Parameterized workers that ingest arguments and dispatch tasks to specialized child workers. |
| `SLAVE` | Ephemeral | Short-lived single-task worker threads that terminate immediately upon task completion. |
| `SLAVE_C` | Ephemeral | Parameterized single-task workers that process arguments and report results back to parent workers. |
| `CFG` | Static / Guarded | Runtime configuration and state schema declarations. |
| `SWORKER` | Elevated | Super Worker with elevated privileges permitted to safely inspect and mutate `CFG` state within defined limits. |
| `SRC` | Library | General-purpose modular library code providing helper routines and type definitions. |

---

## 📐 Language Syntax & Grammar Specification

### File Layout Structure
Every Helios file begins with role, group, imports, and exports:

```hls
type WORKER
group Collision

import math as m
import physics.types as phys

set exports = (
    CheckIntersection,
    ResolveBroadphase
)

cat Broadphase {
    TASK Collision:ResolveBroadphase
    {
        create activeColliders as i32
        set activeColliders = 0
        // Task processing logic
    }
}
```

### Core Grammar Rules
* **Variable Declaration:** `create <identifier> as <type>`
* **Variable Assignment:** `set <identifier> = <expression>`
* **Categories (`cat`):** Logical groupings of functions and tasks within a group.
* **Tasks (`TASK Group:Name`):** Schedulable execution blocks dispatched across server threads.

---

## 🛠️ Tooling & Project Configuration

Helios projects are configured using `.chls` project manifests:

```hls
name = "MasterServer"
entry = "./src/master.hls"
output = "./build/server"
target = "native"
opt = 2

groups = [
    "./src/**"
]

exclude = [
    "./tests/**"
]
```

### CLI Build Pipeline
Helios includes a dedicated pipeline compiler utility:

```bash
# Compile project or target AST
python helios.py build ./src/master.hls

# Launch target runtime
python helios.py run ./build/server
```

### Compiler Architecture
* **`src/lexer/`**: State-machine tokenizer emitting rich token streams with precise source line/column coordinates.
* **`src/parser/`**: Recursive-descent AST parser generating verifiable syntax trees (`nodes.py`, `ParseResult.py`).
* **`libs/Error/`**: Diagnostic formatting engine with visual caret markers and contextual tracebacks.
