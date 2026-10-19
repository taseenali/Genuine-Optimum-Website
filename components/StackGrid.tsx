"use client";

import { STACK } from "@/lib/stack";

/**
 * The tools grid on the capabilities page.
 *
 * Client component because react-icons reads IconContext, which a
 * server component cannot render. It imports STACK directly rather
 * than taking it as a prop, since the icon components in that data
 * are functions and would not survive the server/client boundary.
 */
export default function StackGrid() {
    return (
        <div className="flex flex-col gap-9">
            {STACK.map((group) => (
                <div key={group.label} className="flex flex-col gap-3.5">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                        {group.label}
                    </div>
                    {/* Cell borders rather than a 1px gap over a coloured bed: groups
                        rarely fill their last row, and with a bed the empty
                        slots would show up as solid blocks. */}
                    <div className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {group.items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.name}
                                    className="group flex items-center gap-3 border-b border-r border-line bg-panel px-5 py-5 transition-colors hover:bg-panel-hover"
                                >
                                    {Icon ? (
                                        <Icon
                                            aria-hidden
                                            className="size-[18px] shrink-0 text-dim transition-colors group-hover:text-accent"
                                        />
                                    ) : (
                                        <span
                                            aria-hidden
                                            className="size-[18px] shrink-0"
                                        />
                                    )}
                                    <span className="truncate text-[15px] text-text">
                                        {item.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
