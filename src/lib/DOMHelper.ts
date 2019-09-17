export function sizeToContainer(element: Element, current: number, spacing = 0.8, parent?: Element): number {
    parent = parent || element.parentElement!;
    const ew = element.clientWidth;
    const eh = element.clientHeight;
    const pw = parent.clientWidth;
    const ph = parent.clientHeight;
    return Math.min(((current * pw) / ew) * spacing, ((current * ph) / eh) * spacing);
}
