export function redirectSystemPath({
  _path,
  _initial,
}: { _path: string; _initial: boolean }) {
  console.log('[NativeIntent] Redirecting system path:', _path);
  return '/';
}
