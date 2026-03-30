"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Building2, LayoutDashboard, Briefcase, CheckSquare, Users, Eye } from 'lucide-react';
import { NAV_ITEMS, NavItem, NavGroupItem, NavStaticItem, isStatic } from '@/config/nav';
import { useCurrentUser } from '@/hooks/use-current-user';
import { ROLES_PERMISSIONS, ROLES } from '@/config/roles';
import { cn } from '@/lib/utils';

interface SearchableItem {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  group?: string;
  fullPath: string;
  isStatic?: boolean;
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { user } = useCurrentUser();

  // Generate searchable items based on user permissions (handles nested groups)
  const searchableItems = useMemo(() => {
    if (!user) return [];

    const roleLabel = (ROLES as any)[user.role] || user.role;
    const rolePermissions = (ROLES_PERMISSIONS as any)[roleLabel] || [];
    const permissionSet = new Set(rolePermissions);
    const items: SearchableItem[] = [];

    function processNavItems(navItems: NavItem[], parentPath: string = '', parentGroup: string = '') {
      navItems.forEach(item => {
        if (isGroup(item)) {
          const currentPath = parentPath ? `${parentPath} > ${item.title}` : item.title;
          const currentGroup = parentGroup || item.title;
          // Add the group itself as a searchable item (if user has permission)
          if (!item.permission || permissionSet.has(item.permission)) {
            processNavItems(item.children, currentPath, currentGroup);
          }
        } else if (isStatic(item)) {
          // Static items are always visible within their parent group
          const fullPath = parentPath ? `${parentPath} > ${item.title}` : item.title;
          items.push({
            title: item.title,
            icon: item.icon,
            group: parentGroup || undefined,
            fullPath,
            isStatic: true,
          });
        } else {
          // Leaf item with permission check
          const fullPath = parentPath ? `${parentPath} > ${item.title}` : item.title;
          items.push({
            title: item.title,
            icon: item.icon,
            href: item.href,
            group: parentGroup || undefined,
            fullPath,
            isStatic: false,
          });
        }
      });
    }

    processNavItems(NAV_ITEMS);
    return items;
  }, [user?.role]);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!search) return searchableItems;

    const query = search.toLowerCase();
    return searchableItems.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.fullPath.toLowerCase().includes(query) ||
      (item.group && item.group.toLowerCase().includes(query))
    );
  }, [searchableItems, search]);

  // Group filtered items
  const groupedItems = useMemo(() => {
    const groups: Record<string, SearchableItem[]> = {};

    filteredItems.forEach(item => {
      const groupName = item.group || 'Navigation';
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(item);
    });

    return groups;
  }, [filteredItems]);

  function isGroup(item: NavItem): item is NavGroupItem {
    return (item as NavGroupItem).children !== undefined;
  }

  const handleSelect = (href: string) => {
    setOpen(false);
    setSearch('');
    router.push(href);
  };

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="h-8 w-8 rounded-md border-border/40 hover:border-border/60 hover:bg-muted/50 transition-colors"
        title="Search (Ctrl+K)"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search Navigation"
        description="Search for pages and features"
      >
        <CommandInput
          placeholder="Search navigation..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList className="max-h-[450px]">
          {/* Dominion Branding Header */}


          {!search && (
            <CommandGroup heading="Quick Access">
              <CommandItem onSelect={() => handleSelect('/dashboard')} className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Dashboard</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect('/pipeline-projects')} className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Pipeline Projects</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect('/tasks')} className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Tasks</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect('/users')} className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Users</span>
              </CommandItem>
            </CommandGroup>
          )}

          <CommandEmpty>No results found.</CommandEmpty>

          {Object.entries(groupedItems).map(([groupName, items]) => (
            <CommandGroup key={groupName} heading={groupName}>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.fullPath}
                    value={item.fullPath}
                    onSelect={() => item.href ? handleSelect(item.href) : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2",
                      item.isStatic && "opacity-60 cursor-default"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                    <div className="flex flex-col gap-0.5">
                      <span className={cn("font-medium", item.isStatic && "text-muted-foreground")}>{item.title}</span>
                      {item.group && (
                        <span className="text-xs text-muted-foreground">
                          {item.group}
                        </span>
                      )}
                    </div>
                    {!item.isStatic && item.href && (
                      <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto" />
                    )}
                    {item.isStatic && (
                      <span className="text-xs text-muted-foreground ml-auto italic">View only</span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
