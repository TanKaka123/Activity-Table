import { type ClassValue, clsx } from 'clsx'

const classGroups: Record<string, RegExp[]> = {
  display: [
    /^block$/,
    /^inline(-block)?$/,
    /^flex$/,
    /^inline-flex$/,
    /^grid$/,
    /^hidden$/,
  ],
  position: [/^static$/, /^fixed$/, /^absolute$/, /^relative$/, /^sticky$/],
  overflow: [/^overflow(-(auto|hidden|visible|scroll))$/],
  textAlign: [
    /^text-(left|center|right|justify)$/,
    /^text-start$/,
    /^text-end$/,
  ],
  bg: [/^bg-.*$/],
  borderRadius: [/^rounded(-(none|sm|md|lg|xl|2xl|3xl|full))?$/],
  padding: [/^p[trblxy]?-\d+$/, /^p[trblxy]?-\[.*\]$/],
  margin: [/^m[trblxy]?-\d+$/, /^m[trblxy]?-\[.*\]$/],
  flexDirection: [/^flex-(row|col|row-reverse|col-reverse)$/],
  justifyContent: [/^justify-(start|end|center|between|around|evenly)$/],
  items: [/^items-(start|end|center|baseline|stretch)$/],
};

const getClassGroup = (cls: string): string | undefined => {
  for (const [group, patterns] of Object.entries(classGroups)) {
    if (patterns.some((pattern) => pattern.test(cls))) {
      return group;
    }
  }
  return undefined;
};

const tailwindMerge = (...inputs: string[]): string => {
  const classMap = new Map<string, string>();
  const final: string[] = [];

  const classes = inputs.flatMap((i) => i.trim().split(/\s+/)).filter(Boolean);

  for (const cls of classes) {
    // Preserve modifiers (like `sm:hidden`, `hover:bg-red-500`, etc.)
    const parts = cls.split(":");
    const baseClass = parts.pop()!;
    const modifier = parts.join(":");

    const group = getClassGroup(baseClass);

    const key = modifier ? `${modifier}:${group}` : group;

    if (group) {
      classMap.set(
        key ?? cls,
        modifier ? `${modifier}:${baseClass}` : baseClass
      );
    } else {
      final.push(cls);
    }
  }

  return [...classMap.values(), ...final].join(" ");
};

export function cn(...inputs: ClassValue[]) {
    return tailwindMerge(clsx(inputs))
  }