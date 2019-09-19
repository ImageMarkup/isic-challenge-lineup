// adapted from https://bost.ocks.org/mike/simplify/simplify.js

class MinHeap<T extends {index: number}> {
  private readonly array: T[] = [];

  constructor(private readonly compare: (a: T, b: T) => number) {

  }

  get length() {
    return this.array.length;
  }

  public push(...args: T[]) {
    for (const object of args) {
      this.up(object.index = this.array.push(object) - 1);
    }
    return this.array.length;
  }

  public pop() {
    const removed = this.array[0];
    const object = this.array.pop()!;
    if (this.array.length) {
      this.array[object.index = 0] = object;
      this.down(0);
    }
    return removed;
  }

  public remove(removed: T) {
    const i = removed.index;
    const object = this.array.pop()!;
    if (i !== this.array.length) {
      this.array[object.index = i] = object;
      (this.compare(object, removed) < 0 ? this.up : this.down).call(this, i);
    }
    return i;
  }

  private up(i: number) {
    const object = this.array[i];

    while (i > 0) {
      const up = Math.floor(((i + 1) / 2)) - 1;
      const parent = this.array[up];
      if (this.compare(object, parent) >= 0) {
        break;
      }
      this.array[parent.index = i] = parent;
      this.array[object.index = i = up] = object;
    }
  }

  private down(i: number) {
    const object = this.array[i];
    while (true) {
      const right = (i + 1) * 2;
      const left = right - 1;
      let down = i;
      let child = this.array[down];
      if (left < this.array.length && this.compare(this.array[left], child) < 0) {
        child = this.array[down = left];
      }
      if (right < this.array.length && this.compare(this.array[right], child) < 0) {
        child = this.array[down = right];
      }
      if (down === i) {
        break;
      }
      this.array[child.index = i] = child;
      this.array[object.index = i = down] = object;
    }
  }
}

interface ITriangle<T> {
  index: number;
  previous?: ITriangle<T>;
  next?: ITriangle<T>;
  points: T[];
}

export function simplifyLine<T>(points: T[], x: (v: T) => number, y: (v: T) => number) {
  const triangles: Array<ITriangle<T>> = [];
  const point2area = new Map<T, number>();
  const heap = new MinHeap<ITriangle<T>>((a, b) => point2area.get(a.points[2])! - point2area.get(b.points[2])!);

  function computeArea(sub: T[]) {
    const [a, b, c] = sub;
    return Math.abs((x(a) - x(c)) * (y(b) - y(a)) - (x(a) - x(b)) * (y(c) - y(c)));
  }


  for (let i = 1, n = points.length - 1; i < n; ++i) {
    const sub = points.slice(i - 1, i + 2);
    const triangle = {
      points: sub,
      index: 0
    };
    const area = computeArea(sub);
    if (area) {
      point2area.set(triangle.points[1], area);
      triangles.push(triangle);
      heap.push(triangle);
    }
  }

  for (let i = 0; i < triangles.length; ++i) {
    const triangle = triangles[i];
    triangle.previous = triangles[i - 1];
    triangle.next = triangles[i + 1];
  }

  let maxArea = 0;
  let act: ITriangle<T> | undefined = heap.pop();

  while (act) {
    // If the area of the current point is less than that of the previous point
    // to be eliminated, use the latter’s area instead. This ensures that the
    // current point cannot be eliminated without eliminating previously-
    // eliminated points.
    const center = act.points[1];
    if (point2area.get(center)! < maxArea) {
      point2area.set(center, maxArea);
    } else {
      maxArea = point2area.get(center)!;
    }

    if (act.previous) {
      act.previous.next = act.next;
      act.previous.points[2] = act.points[2];
      update(act.previous);
    } else {
      point2area.set(act.points[0], point2area.get(act.points[1])!);
    }

    if (act.next) {
      act.next.previous = act.previous;
      act.next.points[0] = act.points[0];
      update(act.next);
    } else {
      point2area.set(act.points[2], point2area.get(act.points[1])!);
    }

    act = heap.pop();
  }

  function update(t: ITriangle<T>) {
    heap.remove(t);
    point2area.set(t.points[1], computeArea(t.points));
    heap.push(t);
  }

  return (minArea: number) => {
    return points.filter((point, i) => i === 0 || i === points.length - 1 || (point2area.has(point) && point2area.get(point)! > minArea));
  };
}
