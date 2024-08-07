from scapy.all import *
import time

def send_udp_packets(ip, port, secs, size):
    end_time = time.time() + secs
    packet = IP(dst=ip)/UDP(dport=port)/Raw(load=b'\x00' * size)

    while time.time() < end_time:
        send(packet, verbose=False)
        time.sleep(0.01)

# Example usage:
send_udp_packets("146.103.26.8", 22003, 66, 1024)
