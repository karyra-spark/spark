<script lang="ts">
  import type { Component } from 'svelte';
  import { BadgeCheck, Bell, BookOpen, Bookmark, Calendar, Camera, CheckCircle2, ChevronRight, CircleHelp, ClipboardCheck, Clock, Code2, Compass, FlaskConical, Home, KeyRound, Layers3, LayoutDashboard, LockKeyhole, LogIn, LogOut, Mail, Menu, MessageCircle, Moon, Network, PanelLeft, Search, Settings, ShieldCheck, Sparkles, Sun, Target, Trophy, UserRound, Users, Wallet, X, Zap } from '@lucide/svelte';
  type IconProps={ size?: number|string; strokeWidth?: number|string; class?: string; 'aria-hidden'?: boolean|'true'|'false' }; type IconComponent=Component<IconProps>; type Props={ name:string; size?:number; strokeWidth?:number; class?:string };
  let { name, size=18, strokeWidth=2, class: className='' }: Props = $props();
  const icons: Record<string, IconComponent> = { badge:BadgeCheck, bell:Bell, 'book-open':BookOpen, bookmark:Bookmark, camera:Camera, calendar:Calendar, check:Camera, CheckCircle2, 'chevron-right':ChevronRight, clock:Clock, code:Code2, compass:Compass, dashboard:LayoutDashboard, 'flask-conical':FlaskConical, help:CircleHelp, home:Home, key:KeyRound, layers:Layers3, lock:LockKeyhole, login:LogIn, logout:LogOut, mail:Mail, menu:Menu, messages:MessageCircle, moon:Moon, network:Network, panel:PanelLeft, search:Search, settings:Settings, shield:ShieldCheck, sparkles:Sparkles, sun:Sun, target:Target, trophy:Trophy, Trophy, user:UserRound, 'user-round':UserRound, users:Users, wallet:Wallet, x:X, zap:Zap, clipboard:ClipboardCheck };
  const Icon = $derived(icons[name] ?? Sparkles);
</script>
<Icon {size} {strokeWidth} class={className} aria-hidden="true" />
