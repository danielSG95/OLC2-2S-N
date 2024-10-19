
.data 
array: .word 1 2 3 4 5 -100
array2: .space 400 # reservando 100 
sizeCounter: .word 0

.text
.globl main

main:
	li a0, 10
	jal add_value
	li a0, 12
	jal add_value
	li a0, 20
	jal add_value
	jal print_array
#	jal print_number
#...
	j end

	
add_value:
	la t0, array2 # se carga la direccion del array 
	la t1, sizeCounter # se carga la direccion del size
	lw t2, 0(t1) # cargamos el valor
	
	
	li t3, 4 # constnate de 4 bytes por enteros
	mul t4, t2, t3 # se calcula el desplazamiento i * 4
	add t4, t4, t0 # se suma al desplazamiento la direccion base del array 
	
	sw a0, 0(t4) # guardamos el valor de a0 
	
	addi t2, t2, 1 # i = i + 1; i = i * 4;
	sw t2 0(t1)
	ret
	
print_array:
	mv a1, ra
	la t0, array2 # cargamos la direccion de memoria
	la t1, sizeCounter # cargamos la direccion del tamanio
	lw t2, 0(t1) # obtenemos el valor del tamanio
	li t3, 0 # variable iteradora i 
	jal loop
	ret
		
loop:
	bge t3, t2, end_loop # t3 >= t2 then end_loop
	li t4, 4 # 4 bytes por el entero
	mul t5, t3, t4
	add t5, t0, t5 
	addi sp, sp -16
	sw a0, 0(sp)
	lw a0, 0(t5)
	jal print_number
	lw a0, 0(sp)
	addi, sp, sp, 16
	
	addi t3, t3, 1
	
	j loop
	
end_loop:
	jr a1
	
print_number:
	li a7, 1
	ecall
	mv s1, a0
	li a0, 10
	li a7, 11
	ecall
	mv a0, s1
	ret
	
end: